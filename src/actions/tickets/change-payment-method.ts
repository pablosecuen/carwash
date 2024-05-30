'use server'
import { type Service, type Ticket } from '@/db/entities'
import { invoiceRepository } from '@/db/repositories/invoice'
import { ticketRepository } from '@/db/repositories/ticket'
import { PaymentMethod } from '@/utils/types'

export async function changePaymentMethod({
  invoiceId,
  ticketId,
  service,
  actualPaymentMethod
}: {
  invoiceId: string | number
  ticketId: string | number
  service?: Service
  actualPaymentMethod: Ticket['paymentMethod']
}) {
  try {
    if (service == null)
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

    const { ticket } = await ticketRepository.findById({
      id: Number(ticketId)
    })

    const diff = service.cardPrice - service.cashPrice

    let newTotalPrice = ticket.totalPrice
    let newTotalInvoice = invoice.total
    if (actualPaymentMethod === PaymentMethod.CASH) {
      newTotalInvoice += diff
      newTotalPrice += diff
    } else {
      newTotalInvoice -= diff
      newTotalPrice -= diff
    }

    await Promise.all([
      ticketRepository.changePaymentMethod({
        ticket,
        newTotalPrice,
        newPaymentMethod:
          actualPaymentMethod === PaymentMethod.CASH ? PaymentMethod.CARD : PaymentMethod.CASH
      }),
      invoiceRepository.updateTotal({
        id: invoice.id,
        total: newTotalInvoice
      })
    ])

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
