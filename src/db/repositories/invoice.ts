import { type Branch } from '@/utils/types'
import { Invoice } from '../entities/invoice'
import { BaseRepository } from './base-repository'
import { Between, type FindOperator, ILike, type FindOptionsWhere, In, IsNull } from 'typeorm'
import { type Item } from '../entities/item'

type CreateData = Omit<Invoice, 'id' | 'total' | 'createAt' | 'items' | 'status'> & {
  items: Item[]
}

interface FindOptions {
  from?: Date
  to?: Date
  customerId?: number
  branch?: Branch | undefined
  status?: Invoice['status'] | Array<Invoice['status']>
  cashClosure?: null | {
    id?: number
  }
  joins?: {
    cashClosure?: true
    items?:
      | true
      | {
          product?: true
        }
    tickets?:
      | true
      | {
          vehicle?: true
          service?: true
        }
    customer?: true
  }
  customerName?: string
  limit?: number
  offset?: number
  sort?: {
    sortBy?: string
    sortDir?: 'ASC' | 'DESC'
  }
}

export class InvoiceRepository extends BaseRepository<Invoice> {
  protected entity = Invoice
  async create(data: CreateData) {
    await this.init()
    let total = 0
    data.items.forEach((product) => {
      total += product.totalPrice
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
        },
        order: {
          createAt: 'DESC'
        }
      })
    } catch (error) {
      // FIXME: handle error properly
      console.log(error)
      return []
    }
  }

  async updateStatus({ id, status }: { id: number; status: Invoice['status'] }) {
    if (!['in-progress', 'pending', 'completed', 'cancelled'].includes(status)) {
      throw new Error(`${status} is not a valid status`)
    }
    await this.init()
    const invoice = await this.repository.findOne({ where: { id } })
    if (invoice == null) {
      throw new Error('Invoice not found')
    }
    invoice.status = status
    await this.repository.save(invoice)
    return invoice
  }

  async findAll({
    from,
    to,
    customerId,
    branch,
    status,
    joins,
    cashClosure,
    limit,
    customerName,
    sort,
    offset
  }: FindOptions = {}) {
    await this.init()
    let createAt
    if (from != null) {
      createAt = Between(from, to ?? new Date())
    }
    try {
      const whereClause: FindOptionsWhere<Invoice> = {
        createAt,
        // customer: this.buildCustomerWhereClause({ customerId, customerName }),
        customer: {
          id: customerId ?? undefined,
          name: customerName != null ? ILike(`%${customerName}%`) : undefined
        },
        branch,
        cashClosure: cashClosure === null ? IsNull() : cashClosure,
        status: Array.isArray(status) ? In(status) : status
      }
      const [invoices, count] = await Promise.all([
        this.repository.find({
          where: whereClause,
          take: limit,
          skip: offset,
          order: this.formatSort(sort),
          relations: {
            ...joins
          }
        }),
        this.repository.count({
          where: whereClause,
          relations: {
            customer: whereClause.customer != null
          }
        })
      ])

      return {
        invoices,
        metadata: this.formatMetadataForPagination({
          count,
          limit: limit ?? 0,
          offset: offset ?? 0
        })
      }
    } catch (error) {
      console.log(error)
      throw new Error('Error finding invoices')
    }
  }

  private formatSort(sort: { sortBy?: string; sortDir?: 'ASC' | 'DESC' } = {}) {
    if (sort?.sortBy?.includes('.') === true) {
      const [relation, column] = sort.sortBy.split('.')
      return {
        [relation]: {
          [column]: sort.sortDir ?? 'DESC'
        }
      }
    }
    return {
      [sort.sortBy ?? 'createAt']: sort.sortDir ?? 'DESC'
    }
  }

  private buildCustomerWhereClause({ customerId, customerName }: FindOptions) {
    const customer: { id?: number; name?: FindOperator<string> } | undefined = {}
    if (customerId != null) customer.id = customerId
    if (customerName != null) customer.name = ILike(`%${customerName}%`)
    return Object.keys(customer).length === 0 ? customer : undefined
  }

  async setCashClosure({
    invoices,
    cashClosure
  }: {
    invoices: Invoice[]
    cashClosure: Invoice['cashClosure']
  }) {
    await this.init()
    const invoiceIds = invoices.map((invoice) => invoice.id)
    await this.repository.update(invoiceIds, { cashClosure })
  }

  async updateTotal({ id, total }: { id: number; total: number }) {
    await this.init()
    await this.repository.update(id, { total })
  }

  async addItem({ invoiceId, item }: { item: Item; invoiceId: number }) {
    await this.init()
    const invoice = await this.repository.findOne({
      where: {
        id: invoiceId
      },
      relations: {
        items: true
      }
    })
    if (invoice == null) {
      throw new Error('Invoice not found')
    }
    invoice.items.push(item)
    invoice.total += item.totalPrice
    await this.repository.save(invoice)
  }

  async findById(id: number, opts: { joins?: FindOptions['joins'] } = {}) {
    await this.init()
    const invoice = await this.repository.findOne({
      where: {
        id
      },
      relations: {
        ...opts.joins
      }
    })

    if (invoice == null) {
      throw new Error('Invoice not found')
    }

    return { invoice }
  }
}

export const invoiceRepository = new InvoiceRepository()
