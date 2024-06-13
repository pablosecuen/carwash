'use client'
import { changePaymentMethodInvoice } from '@/actions/invoice/change-payment-method'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { PaymentMethod } from '@/utils/types'

export function ChangePaymentBtnsInvoice({ invoiceId }: { invoiceId: number }) {
  const { toast } = useToast()
  return (
    <div className='flex justify-between gap-2'>
      <Button
        variant={'secondary'}
        size={'sm'}
        className='w-full'
        onClick={async () => {
          const data = await changePaymentMethodInvoice({
            invoiceId,
            paymentMethod: PaymentMethod.CASH
          })
          if (data.ok) {
            toast({
              variant: 'default',
              title: data.message
            })
            return
          }
          toast({
            variant: 'destructive',
            title: data.message
          })
        }}
      >
        Cambiar pagos a efectivo
      </Button>
      <Button
        variant={'secondary'}
        size={'sm'}
        className='w-full'
        onClick={async () => {
          const data = await changePaymentMethodInvoice({
            invoiceId,
            paymentMethod: PaymentMethod.CARD
          })
          if (data.ok) {
            toast({
              variant: 'default',
              title: data.message
            })
            return
          }
          toast({
            variant: 'destructive',
            title: data.message
          })
        }}
      >
        Cambiar pagos a crédito
      </Button>
    </div>
  )
}
