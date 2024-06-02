'use server'

import { invoiceRepository } from '@/db/repositories/invoice'
import { PaymentMethod } from '@/utils/types'
import { revalidatePath } from 'next/cache'
import { itemRepository } from '@/db/repositories/item'
import { ticketRepository } from '@/db/repositories/ticket'

const calculateNewTotalPrice = ({
  invoiceTotal,
  cardPrice,
  cashPrice,
  paymentMethod,
  totalPrice
}: {
  cardPrice: number
  cashPrice: number
  paymentMethod: PaymentMethod
  totalPrice: number
  invoiceTotal: number
}) => {
  const diff = cardPrice - cashPrice
  let newTotalPrice = totalPrice
  let newTotalInvoice = invoiceTotal
  if (paymentMethod === PaymentMethod.CASH) {
    newTotalPrice = cashPrice
    newTotalInvoice += diff
  } else {
    newTotalPrice = cardPrice
    newTotalInvoice -= diff
  }
  return {
    newTotalPrice,
    newTotalInvoice
  }
}
export async function changePaymentMethodInvoice({
  invoiceId,
  paymentMethod
}: {
  invoiceId: number
  paymentMethod: PaymentMethod
}) {
  try {
    const { invoice } = await invoiceRepository.findById(Number(invoiceId), {
      joins: {
        cashClosure: true,
        items: {
          product: true
        },
        tickets: {
          service: true
        }
      }
    })

    if (invoice.cashClosure != null) {
      return {
        ok: false,
        message: 'No se puede cambiar el método de pago de una factura cerrada'
      }
    }

    const paymentsToChange: Array<Promise<void>> = []

    let newTotalInvoice = invoice.total

    invoice.items.forEach((item) => {
      if (item.paymentMethod === paymentMethod) return
      const { newTotalInvoice: totalInvoice, newTotalPrice } = calculateNewTotalPrice({
        cardPrice: item.product.cardPrice,
        cashPrice: item.product.cashPrice,
        paymentMethod: item.paymentMethod,
        totalPrice: item.totalPrice,
        invoiceTotal: newTotalInvoice
      })
      newTotalInvoice = totalInvoice

      paymentsToChange.push(
        itemRepository.changePaymentMethod({
          item,
          newTotalPrice,
          newPaymentMethod: paymentMethod
        })
      )
    })

    invoice.tickets.forEach((ticket) => {
      if (ticket.paymentMethod === paymentMethod) return
      if (ticket.service == null) throw new Error('No se ha encontrado el servicio')
      const { newTotalInvoice: totalInvoice, newTotalPrice } = calculateNewTotalPrice({
        cardPrice: ticket.service.cardPrice,
        cashPrice: ticket.service.cashPrice,
        paymentMethod: ticket.paymentMethod,
        totalPrice: ticket.totalPrice,
        invoiceTotal: newTotalInvoice
      })

      newTotalInvoice = totalInvoice

      paymentsToChange.push(
        ticketRepository.changePaymentMethod({
          ticket,
          newTotalPrice,
          newPaymentMethod: paymentMethod
        })
      )
    })

    await Promise.all([
      ...paymentsToChange,
      invoiceRepository.updateTotal({
        id: invoice.id,
        total: newTotalInvoice
      })
    ])

    revalidatePath('/manager/invoices')
    return {
      ok: true,
      message: 'Se ha cambiado el método de pago con éxito'
    }
  } catch (e) {
    return {
      ok: false,
      message: 'Ha ocurrido un error al cambiar el método de pago'
    }
  }
}
