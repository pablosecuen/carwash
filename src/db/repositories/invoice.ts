import { PaymentMethod } from '@/utils/types'
import { Invoice } from '../entities/invoice'
import { type Product } from '../entities/product'
import { BaseRepository } from './base-repository'
import { Between } from 'typeorm'

type CreateData = Omit<Invoice, 'id' | 'total' | 'createAt' | 'products' | 'status'> & {
  products: Array<Product & { paymentMethod: PaymentMethod }>
}

export class InvoiceRepository extends BaseRepository<Invoice> {
  protected entity = Invoice
  async create(data: CreateData) {
    await this.init()
    let total = 0
    data.products.forEach((product) => {
      total += product.paymentMethod === PaymentMethod.CARD ? product.cardPrice : product.cashPrice
    })

    data.tickets.forEach((ticket) => {
      total += ticket.totalPrice
    })

    const invoice = this.repository.create({
      ...data,
      total,
      status: 'pending',
      createAt: new Date()
    })
    await this.repository.save(invoice)
    return invoice
  }

  async findByCustomerId(customerId: string, options?: { from?: Date; to?: Date }) {
    await this.init()
    let createAt
    if (options?.from != null) {
      createAt = Between(options.from, options.to ?? new Date())
    }
    try {
      return await this.repository.find({
        where: {
          customer: {
            id: Number(customerId)
          },
          createAt
        }
      })
    } catch (error) {
      // FIXME: handle error properly
      console.log(error)
      return []
    }
  }
}

export const invoiceRepository = new InvoiceRepository()
