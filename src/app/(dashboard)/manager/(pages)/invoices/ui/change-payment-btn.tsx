'use client'

import { changePaymentMethod } from '@/actions/tickets/change-payment-method'
import { Button } from '@/components/ui/button'
import type { Service } from '@/db/entities/services'
import { type PaymentMethod } from '@/utils/types'

interface Props {
  invoiceId: number
  ticketId: number
  service?: Service
  paymentMethod: PaymentMethod
}

export function ChangePaymentBtn({ invoiceId, paymentMethod, ticketId, service }: Props) {
  return (
    <Button
      variant={'secondary'}
      onClick={async () => {
        const data = await changePaymentMethod({
          invoiceId,
          ticketId,
          service,
          actualPaymentMethod: paymentMethod
        })
        console.log(data)
      }}
    >
      Cambiar a pago con {paymentMethod === 'cash' ? 'Tarjeta' : 'Efectivo'}
    </Button>
  )
}
