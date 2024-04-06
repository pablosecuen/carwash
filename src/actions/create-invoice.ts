'use server'
import { type Invoice } from '@/db/entities/invoice'
import { type Product } from '@/db/entities/product'
import { type Ticket } from '@/db/entities/ticket'
import { customerRepository } from '@/db/repositories/customer'
import { invoiceRepository } from '@/db/repositories/invoice'
import { type PaymentMethod } from '@/utils/types'

export async function createInvoiceAction({
  customerId,
  tickets,
  products
}: {
  customerId: string
  tickets: Ticket[]
  products: Array<Product & { paymentMethod: PaymentMethod }>
}) {
  const customer = await customerRepository.findById(Number(customerId))

  const invoice = await invoiceRepository.create({
    customer,
    tickets,
    products
  })
  return JSON.parse(JSON.stringify(invoice)) as Invoice
}
