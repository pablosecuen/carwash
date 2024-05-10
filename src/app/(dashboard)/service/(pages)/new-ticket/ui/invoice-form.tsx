'use client'

import { type Vehicle } from '@/db/entities'
import { type Service } from '@/db/entities/services'
import { type Ticket } from '@/db/entities/ticket'
import { ServiceField } from './services-field'
import { useState } from 'react'
import { ProductsField } from './products-field'
import { type Product } from '@/db/entities/product'
import { type PaymentMethod } from '@/utils/types'
import { createInvoiceAction } from '@/actions/invoice/create-invoice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { currencyFormat, dateFormat } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'

type ProductAdded = Product & { paymentMethod: PaymentMethod }

export function InvoiceForm({
  services,
  vehicles,
  customerId,
  products: allProducts
}: {
  customerId?: string
  services: Service[]
  vehicles: Vehicle[]
  products: Product[]
}) {
  const router = useRouter()
  const { toast } = useToast()

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [products, setProducts] = useState<ProductAdded[]>([])

  const addTicket = (ticket: Ticket) => {
    setTickets([...tickets, ticket])
  }
  const addProduct = (product: ProductAdded) => {
    setProducts([...products, product])
  }
  // if (customerId == null) return null
  const onCreateInvoice = async () => {
    if (customerId == null) return

    const { ok, message } = await createInvoiceAction({
      customerId,
      tickets,
      products
    })
    if (!ok) {
      toast({
        title: message,
        variant: 'destructive'
      })
    }
    toast({
      title: message
    })

    router.push('/service')
  }

  const totalTickets = tickets.reduce((acc, ticket) => acc + ticket.totalPrice, 0)
  const totalProducts = products.reduce((acc, product) => {
    return acc + (product.paymentMethod === 'cash' ? product.cashPrice : product.cardPrice)
  }, 0)
  const totalInvoice = totalTickets + totalProducts
  return (
    <>
      <div className='grid grid-cols-2 gap-10'>
        <div className='flex flex-col gap-5'>
          <ServiceField {...{ allServices: services, vehicles }} addTicket={addTicket} />
          <ProductsField products={allProducts} addProduct={addProduct} />
        </div>

        <Card className='mx-auto w-full bg-muted/20 px-6  py-8 shadow-lg'>
          <CardHeader>
            <CardTitle>Factura</CardTitle>
          </CardHeader>
          <Separator className='mb-2' />
          {/* <hr className='mb-2' /> */}
          <CardContent>
            <div className='mb-6 flex justify-between'>
              <div className=''>Fecha: 08/05/2024</div>
            </div>
            {/* Detalle del usuario */}
            <div className='mb-8'>
              <h2 className='mb-4 text-lg font-bold'>Bill To:</h2>
              {/* name */}
              {/* <div className='mb-2 '>{customer?.name ?? 'John Doe'}</div> */}
              {/* address */}
              {/* <div className='mb-2 '>{customer?.address ?? '123 Main St'}</div> */}

              {/* email */}
              {/* <div className=''>{customer?.email ?? 'example@gmail.com'}</div> */}
            </div>
            <Table className='mb-8 w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-left font-bold '>Description</TableHead>
                  <TableHead className='text-right font-bold '>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map(({ id, totalPrice, vehicle, service }) => (
                  <TableRow key={id}>
                    <TableCell className='text-left '>{service?.name}</TableCell>
                    <TableCell className='text-right '>{currencyFormat(totalPrice)}</TableCell>
                  </TableRow>
                ))}
                {products.map(({ id, name, paymentMethod, cashPrice, cardPrice }) => (
                  <TableRow key={id}>
                    <TableCell className='text-left '>{name}</TableCell>
                    <TableCell className='text-right '>
                      {paymentMethod === 'cash'
                        ? currencyFormat(cashPrice)
                        : currencyFormat(cardPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className='text-left font-bold '>Total</TableCell>
                  <TableCell className='text-right font-bold '>
                    {currencyFormat(totalInvoice)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Button className='w-full' variant={'outline'} onClick={onCreateInvoice}>
              Generar Resumen
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// {tickets.map(({ id, totalPrice, vehicle, service, paymentMethod }) => (
//   <Card key={id} className='mt-10 p-5'>
//     <div className='flex flex-col gap-5 md:flex-row'>
//       <p>Vehiculo: {vehicle.patent}</p>

//       <p>Servicio: {service.name}</p>
//       {currencyFormat(totalPrice)}
//       {/* <ServiceField {...{ allServices: services, vehicles }} addTicket={addTicket} />
//       <ProductsField products={allProducts} addProduct={addProduct} /> */}
//     </div>
//   </Card>
// ))}
