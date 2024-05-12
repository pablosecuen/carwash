'use client'

import { type Vehicle } from '@/db/entities'
import { type Service } from '@/db/entities/services'
import { type Ticket } from '@/db/entities/ticket'
import { ServiceField } from './services-field'
import { useEffect, useState } from 'react'
import { ProductsField } from './products-field'
import { type Product } from '@/db/entities/product'
import { type PaymentMethod } from '@/utils/types'
import { createInvoiceAction } from '@/actions/invoice/create-invoice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { currencyFormat, dateFormat } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { obtenerFechaActual } from '@/utils/formatters'
import { deleteTicketById } from '@/actions/tickets/delete-ticket-by-id'

type ProductAdded = Product & { paymentMethod: PaymentMethod }

const getCartFromSessionStorage = (): { tickets: Ticket[]; products: ProductAdded[] } => {
  const cartData = sessionStorage.getItem('shoppingCart')
  return cartData != null
    ? JSON.parse(cartData)
    : { tickets: [] as Ticket[], products: [] as ProductAdded[] }
}

// Función para guardar el estado del carrito en sessionStorage
const saveCartToSessionStorage = (cart: { tickets: Ticket[]; products: ProductAdded[] }) => {
  sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
}
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
  const params = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [shoppingCart, setShoppingCart] = useState(getCartFromSessionStorage())

  const addTicket = (ticket: Ticket) => {
    const updatedCart = { ...shoppingCart, tickets: [...shoppingCart.tickets, ticket] }
    setShoppingCart(updatedCart)
    saveCartToSessionStorage(updatedCart)
  }
  const addProduct = (product: ProductAdded): void => {
    const updatedCart: { tickets: Ticket[]; products: ProductAdded[] } = {
      ...shoppingCart,
      products: [...shoppingCart.products, product]
    }
    setShoppingCart(updatedCart)
    saveCartToSessionStorage(updatedCart)
  }

  const removeTicketById = async (id: string) => {
    const { message, ok } = await deleteTicketById(id)
    if (ok) {
      const updatedCart: { tickets: Ticket[]; products: ProductAdded[] } = {
        ...shoppingCart,
        tickets: shoppingCart.tickets.filter((ticket) => ticket.id !== Number(id))
      }
      setShoppingCart(updatedCart)
      saveCartToSessionStorage(updatedCart)
      toast({
        title: message
      })
    }
  }
  const removeProductById = (id: number) => {
    const updatedCart: { tickets: Ticket[]; products: ProductAdded[] } = {
      ...shoppingCart,
      products: shoppingCart.products.filter((product: ProductAdded) => product.id !== id)
    }
    setShoppingCart(updatedCart)
    saveCartToSessionStorage(updatedCart)
  }
  useEffect(() => {
    // Guardar el carrito en sessionStorage cada vez que cambie
    saveCartToSessionStorage(shoppingCart)

    // Eliminar el carrito de la sesión cuando se cierre la página
    return () => {
      sessionStorage.removeItem('shoppingCart')
    }
  }, [shoppingCart])
  // if (customerId == null) return null
  const onCreateInvoice = async () => {
    if (customerId == null) return

    const { ok, message } = await createInvoiceAction({
      customerId,
      tickets: shoppingCart.tickets,
      products: shoppingCart.products
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

  const totalTickets: number = shoppingCart.tickets.reduce(
    (acc: number, ticket: Ticket) => acc + ticket.totalPrice,
    0
  )
  const totalProducts: number = shoppingCart.products.reduce(
    (acc: number, product: ProductAdded) => {
      return acc + (product.paymentMethod === 'cash' ? product.cashPrice : product.cardPrice)
    },
    0
  )
  const totalInvoice = totalTickets + totalProducts
  return (
    <>
      <div className='relative grid gap-10 lg:grid-cols-2'>
        <div className='flex flex-col gap-5'>
          <ServiceField {...{ allServices: services, vehicles }} addTicket={addTicket} />
          <ProductsField products={allProducts} addProduct={addProduct} />
        </div>

        <Card className='scrollbar-none right-0 mx-auto max-h-[70vh] overflow-scroll   bg-muted/20 px-6 py-8 shadow-lg lg:absolute lg:w-1/2'>
          <CardHeader>
            <CardTitle>Factura</CardTitle>
          </CardHeader>
          <Separator className='' />
          {/* <hr className='mb-2' /> */}
          <CardContent className='my-3'>
            <p className='font-bold '>Fecha: {obtenerFechaActual()}</p>

            {/* Detalle del usuario */}
            <div className='mb-8'>
              <h2 className='mb-4 text-lg font-bold'>Detalle del cliente:</h2>
              {/* name */}
              <div className='mb-2 '>
                <span className='font-bold'>Nombre: </span>
                <span>{params.get('customerName')}</span>
              </div>

              {/* email */}
              {/* <div className=''>{customer?.email ?? 'example@gmail.com'}</div> */}
            </div>
            <Table className='mb-8 w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-left font-bold '>Description</TableHead>
                  <TableHead className=''>
                    <span className='sr-only'>Action</span>
                  </TableHead>
                  <TableHead className='text-right font-bold '>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shoppingCart.tickets.map(({ id, totalPrice, service }) => (
                  <TableRow key={id}>
                    <TableCell className='text-left '>{service?.name}</TableCell>
                    <TableCell className='flex items-end justify-end '>
                      <Button
                        variant={'destructive'}
                        onClick={async () => {
                          await removeTicketById(id.toString())
                        }}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                    <TableCell className='text-right '>{currencyFormat(totalPrice)}</TableCell>
                  </TableRow>
                ))}
                {shoppingCart.products.map(
                  ({ id, name, paymentMethod, cashPrice, cardPrice }, index) => (
                    <TableRow key={index}>
                      <TableCell className='text-left '>{name}</TableCell>
                      <TableCell className='flex items-end justify-end '>
                        <Button
                          variant={'destructive'}
                          onClick={() => {
                            removeProductById(id)
                          }}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                      <TableCell className='text-right '>
                        {paymentMethod === 'cash'
                          ? currencyFormat(cashPrice)
                          : currencyFormat(cardPrice)}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className='text-left font-bold '>
                    Total
                  </TableCell>
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
