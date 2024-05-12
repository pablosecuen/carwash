'use server'
import { type Product } from '@/db/entities/product'
import { type Ticket } from '@/db/entities/ticket'
import { customerRepository } from '@/db/repositories/customer'
import { invoiceRepository } from '@/db/repositories/invoice'
import { ticketRepository } from '@/db/repositories/ticket'
import { type PaymentMethod } from '@/utils/types'
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
    const invoice = await invoiceRepository.create({
      customer,
      tickets,
      branch,
      products
    })

    await Promise.all(
      tickets.map(async (ticket) => {
        await ticketRepository.setInvoice({
          ticketId: ticket.id,
          invoice
        })
      })
    )
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
