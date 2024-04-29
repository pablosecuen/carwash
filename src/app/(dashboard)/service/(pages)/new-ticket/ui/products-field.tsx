import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { type Product } from '@/db/entities/product'
import { currencyFormat } from '@/lib/utils'
import { PaymentMethod } from '@/utils/types'
import { CreditCardIcon, Receipt } from 'lucide-react'

export function ProductsField({
  products,
  addProduct
}: {
  products: Product[]
  addProduct: (product: Product & { paymentMethod: PaymentMethod }) => void
}) {
  return (
    <Card className=' flex-1 bg-muted/50'>
      <ul className='scrollbar-none max-h-96 overflow-scroll p-5'>
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
                onClick={() => {
                  addProduct({ ...product, paymentMethod: PaymentMethod.CARD })
                }}
              >
                <CreditCardIcon className='mr-2 w-5' /> {currencyFormat(product.cardPrice)}
              </Button>

              <Button
                size={'sm'}
                className='w-full'
                variant={'outline'}
                onClick={() => {
                  addProduct({ ...product, paymentMethod: PaymentMethod.CASH })
                }}
              >
                <Receipt className='mr-2 w-5' /> {currencyFormat(product.cashPrice)}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
