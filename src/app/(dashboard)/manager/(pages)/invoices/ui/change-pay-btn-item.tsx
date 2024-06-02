'use client'

import { changePaymentMethod } from '@/actions/item/change-payment-method'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { type Product } from '@/db/entities'
import { type PaymentMethod } from '@/utils/types'

export function ChangePaymentMethodBtnItem({
  invoiceId,
  itemId,
  product,
  paymentMethod
}: {
  invoiceId: string | number
  itemId: string | number
  product?: Product
  paymentMethod: PaymentMethod
}) {
  const { toast } = useToast()
  return (
    <Button
      variant={'secondary'}
      onClick={async () => {
        const data = await changePaymentMethod({
          invoiceId,
          itemId,
          product,
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
