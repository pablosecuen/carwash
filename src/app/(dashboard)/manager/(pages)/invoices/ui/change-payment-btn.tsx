'use client'

import { changePaymentMethod } from '@/actions/tickets/change-payment-method'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import type { Service } from '@/db/entities/services'
import { type PaymentMethod } from '@/utils/types'

interface Props {
  invoiceId: number
  ticketId: number
  service?: Service
  paymentMethod: PaymentMethod
}

export function ChangePaymentBtn({ invoiceId, paymentMethod, ticketId, service }: Props) {
  const { toast } = useToast()
  return (
    <Button
      variant={'secondary'}
      className='w-full'
      onClick={async () => {
        const data = await changePaymentMethod({
          invoiceId,
          ticketId,
          service,
          actualPaymentMethod: paymentMethod
        })
        if (data.ok) {
          toast({
            title: 'Método de pago cambiado correctamente, recarga la pagina para ver los cambios'
          })
          return
        }

        toast({
          variant: 'destructive',
          title: data.message
        })
      }}
    >
      Cambiar a pago con {paymentMethod === 'cash' ? 'Tarjeta' : 'Efectivo'}
    </Button>
  )
}
