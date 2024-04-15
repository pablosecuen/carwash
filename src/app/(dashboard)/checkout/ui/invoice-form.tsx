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

  return (
    <>
      <ServiceField {...{ allServices: services, vehicles }} addTicket={addTicket} />
      <ProductsField products={allProducts} addProduct={addProduct} />
      <button
        onClick={async () => {
          if (customerId == null) return

          const invoice = await createInvoiceAction({
            customerId,
            tickets,
            products
          })
          console.log({ invoice })
        }}
      >
        Generar Resumen
      </button>
    </>
  )
}
