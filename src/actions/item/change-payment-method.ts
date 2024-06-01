'use server'
import { type Product } from '@/db/entities'
import { invoiceRepository } from '@/db/repositories/invoice'
import { itemRepository } from '@/db/repositories/item'
import { PaymentMethod } from '@/utils/types'
import { revalidatePath } from 'next/cache'

export async function changePaymentMethod({
  invoiceId,
  itemId,
  product,
  actualPaymentMethod
}: {
  invoiceId: string | number
  itemId: string | number
  product?: Product
  actualPaymentMethod: PaymentMethod
}) {
  try {
    if (product == null)
      return {
        ok: false,
        message: 'Debe seleccionar un servicio'
      }

    const { invoice } = await invoiceRepository.findById(Number(invoiceId), {
      joins: {
        cashClosure: true
      }
    })

    if (invoice.cashClosure != null) {
      return {
        ok: false,
        message: 'No se puede cambiar el método de pago de una factura cerrada'
      }
    }

    const { item } = await itemRepository.findById({
      id: Number(itemId)
    })

    const diff = product.cardPrice - product.cashPrice

    let newTotalPrice = item.totalPrice
    let newTotalInvoice = invoice.total
    if (actualPaymentMethod === PaymentMethod.CASH) {
      newTotalInvoice += diff
      newTotalPrice += diff
    } else {
      newTotalInvoice -= diff
      newTotalPrice -= diff
    }

    await Promise.all([
      itemRepository.changePaymentMethod({
        item,
        newTotalPrice,
        newPaymentMethod:
          actualPaymentMethod === PaymentMethod.CASH ? PaymentMethod.CARD : PaymentMethod.CASH
      }),
      invoiceRepository.updateTotal({
        id: invoice.id,
        total: newTotalInvoice
      })
    ])

    revalidatePath('manager/invoices')
    return {
      ok: true,
      message: 'Método de pago cambiado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrio un error'
    }
  }
}
