import { cn, currencyFormat } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet
} from '@/components/ui/sheet'

import { getAllProducts } from '@/actions/product/getters'

interface Props {
  className?: string
  title: string
  description: string
}

export const DashboardCardProducts = async ({ className, description, title }: Props) => {
  const products = await getAllProducts()
  return (
    <Card className={cn('', className)}>
      <CardHeader className='pb-3'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className=' text-pretty leading-relaxed'>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Ver productos</Button>
          </SheetTrigger>
          <SheetContent className=''>
            <SheetHeader>
              <SheetTitle>Productos</SheetTitle>
              <SheetDescription>
                Estas viendo todos los productos que tienes en el sistema.
              </SheetDescription>
            </SheetHeader>
            <div className='grid gap-2'>
              {products?.map((product) => {
                return (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle className='text-lg'>{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Precio efectivo: {currencyFormat(product.cardPrice)}</p>
                      <p>Precio con tarjeta: {currencyFormat(product.cashPrice)}</p>
                    </CardContent>
                  </Card>
                )
              })}
              {products.length === 0 && <p>No hay productos</p>}
            </div>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  )
}
