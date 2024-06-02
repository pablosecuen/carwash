'use server'
import { type Product } from '@/db/entities/product'
import { type Ticket } from '@/db/entities/ticket'
import { customerRepository } from '@/db/repositories/customer'
import { invoiceRepository } from '@/db/repositories/invoice'
import { itemRepository } from '@/db/repositories/item'
import { ticketRepository } from '@/db/repositories/ticket'
import { PaymentMethod } from '@/utils/types'
import { getUserBranch } from '@/utils/user-validate'
import { revalidatePath } from 'next/cache'

export async function createInvoiceAction({
  customerId,
  tickets,
  products
}: {
  customerId: string
  tickets: Ticket[]
  products: Array<Product & { paymentMethod: PaymentMethod }>
}) {
  try {
    const customer = await customerRepository.findById(Number(customerId))
    const branch = await getUserBranch()

    const items = await Promise.all(
      products.map(async ({ paymentMethod, ...product }) => {
        const item = await itemRepository.create({
          product,
          paymentMethod,
          totalPrice: paymentMethod === PaymentMethod.CASH ? product.cashPrice : product.cardPrice
        })
        return item
      })
    )
    const invoice = await invoiceRepository.create({
      customer,
      tickets,
      branch,
      items
    })

    // Set invoice to tickets and items
    await Promise.all([
      ...tickets.map(async (ticket) => {
        await ticketRepository.setInvoice({
          ticketId: ticket.id,
          invoice
        })
      }),
      ...items.map(async (item) => {
        await itemRepository.setInvoice({
          itemId: item.id,
          invoice
        })
      })
    ])

    revalidatePath('/service')
    return {
      ok: true,
      message: 'Factura creada correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrio un error'
    }
  }
}
