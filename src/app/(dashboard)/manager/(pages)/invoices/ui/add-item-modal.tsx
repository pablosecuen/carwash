'use client'
import { addItemAction } from '@/actions/invoice/add-item'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { type Product } from '@/db/entities'
import { currencyFormat } from '@/lib/utils'
import { PaymentMethod } from '@/utils/types'
import { CreditCardIcon, Receipt } from 'lucide-react'

export function AddItemModal({
  products,
  invoiceId
}: {
  products: Product[]
  invoiceId: number | string
}) {
  const { toast } = useToast()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='ml-2' variant='outline'>
          Añadir Producto
        </Button>
      </DialogTrigger>
      <DialogContent className='h-full max-h-[75dvh]'>
        <DialogHeader>
          <DialogTitle>Añadir productos a la factura</DialogTitle>
          <DialogDescription>
            <ul className='scrollbar-none overflow-scroll p-5'>
              {products.map((product) => (
                <li className='mb-7 flex flex-1 flex-col items-start gap-2' key={product.id}>
                  <div className='flex-1'>
                    <h3 className=' font-semibold '>{product.name}</h3>
                  </div>

                  <div className='grid w-full grid-cols-2 place-content-center justify-items-center'>
                    <Label>Tarjeta</Label>
                    <Label>Efectivo</Label>
                  </div>

                  <div className='flex w-full'>
                    <Button
                      size={'sm'}
                      className='w-full'
                      variant={'outline'}
                      onClick={async () => {
                        const { message, ok } = await addItemAction({
                          product,
                          invoiceId,
                          paymentMethod: PaymentMethod.CARD
                        })
                        toast({
                          title: message,
                          variant: ok ? 'default' : 'destructive'
                        })
                      }}
                    >
                      <CreditCardIcon className='mr-2 w-5' /> {currencyFormat(product.cardPrice)}
                    </Button>

                    <Button
                      size={'sm'}
                      className='w-full'
                      variant={'outline'}
                      onClick={async () => {
                        const { message, ok } = await addItemAction({
                          product,
                          invoiceId,
                          paymentMethod: PaymentMethod.CARD
                        })
                        toast({
                          title: message,
                          variant: ok ? 'default' : 'destructive'
                        })
                      }}
                    >
                      <Receipt className='mr-2 w-5' /> {currencyFormat(product.cashPrice)}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
