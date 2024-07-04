'use server'

import { type Product } from '@/db/entities'
import { invoiceRepository } from '@/db/repositories/invoice'
import { itemRepository } from '@/db/repositories/item'
import { PaymentMethod } from '@/utils/types'
import { revalidatePath } from 'next/cache'

export async function addItemAction({
  product,
  invoiceId,
  paymentMethod
}: {
  product: Product
  invoiceId: number | string
  paymentMethod: PaymentMethod
}) {
  try {
    const { invoice } = await invoiceRepository.findById(Number(invoiceId))
    const item = await itemRepository.create({
      product,
      paymentMethod,
      totalPrice: paymentMethod === PaymentMethod.CASH ? product.cashPrice : product.cardPrice
    })

    await Promise.all([
      itemRepository.setInvoice({
        invoice,
        itemId: item.id
      }),
      invoiceRepository.addItem({
        invoiceId: invoice.id,
        item
      })
    ])
    revalidatePath('/manager/invoices')
    return {
      ok: true,
      message: 'Item añadido correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrio un error al agregar el item'
    }
  }
}
