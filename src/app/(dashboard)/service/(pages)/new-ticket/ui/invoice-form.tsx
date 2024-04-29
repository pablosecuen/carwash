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
import { Card } from '@/components/ui/card'
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
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [products, setProducts] = useState<ProductAdded[]>([])
  const addTicket = (ticket: Ticket) => {
    setTickets([...tickets, ticket])
  }
  const addProduct = (product: ProductAdded) => {
    setProducts([...products, product])
  }
  if (customerId == null) return null
  const onCreateInvoice = async () => {
    if (customerId == null) return
    console.log('first')
    const invoice = await createInvoiceAction({
      customerId,
      tickets,
      products
    })

    console.log({ invoice })
  }
  return (
    <>
      <Card className='mt-10 p-5'>
        <div className='flex flex-col gap-5 md:flex-row'>
          <ServiceField {...{ allServices: services, vehicles }} addTicket={addTicket} />
          <ProductsField products={allProducts} addProduct={addProduct} />
        </div>
      </Card>

      {tickets.map((ticket) => (
        <Card key={ticket.id} className='mt-10 p-5'>
          <div className='flex flex-col gap-5 md:flex-row'>
            {currencyFormat(ticket.totalPrice)}
            {/* <ServiceField {...{ allServices: services, vehicles }} addTicket={addTicket} /> */}
            {/* <ProductsField products={allProducts} addProduct={addProduct} /> */}
          </div>
        </Card>
      ))}
      <Button onClick={onCreateInvoice}>Generar Resumen</Button>
    </>
  )
}
