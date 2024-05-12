import { type Branch, PaymentMethod, TicketStatus } from '@/utils/types'
import { Ticket } from '../entities/ticket'
import { BaseRepository } from './base-repository'
import { Between, type FindManyOptions } from 'typeorm'

interface FilterOpts {
  from?: Date
  to?: Date
  offset?: number
  limit?: number
  branch?: Branch
  status?: TicketStatus
  joins?: Partial<{
    vehicle: boolean
    service: boolean
    invoice: boolean
  }>
}

export class TicketRepository extends BaseRepository<Ticket> {
  protected entity = Ticket

  async create(data: Omit<Ticket, 'id' | 'createdAt' | 'totalPrice' | 'status'>) {
    await this.init()
    const totalPrice =
      data.paymentMethod === PaymentMethod.CARD ? data.service?.cardPrice : data.service?.cashPrice
    const ticket = this.repository.create({
      ...data,
      totalPrice,
      createdAt: new Date()
    })
    await this.repository.save(ticket)
    return ticket
  }

  async findByVehicleId(vehicleId: string, options?: { from?: Date; to?: Date }) {
    await this.init()
    let createdAt
    if (options?.from != null || options?.to != null) {
      createdAt = Between(options.from ?? new Date(), options?.to ?? new Date())
    }
    try {
      return await this.repository.find({
        where: {
          vehicle: {
            id: Number(vehicleId)
          },
          createdAt
        },
        relations: ['service'],
        order: {
          createdAt: 'DESC'
        }
      })
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async updateStatus({ id, status }: { id: number; status: TicketStatus }) {
    await this.init()
    if (!Object.values(TicketStatus).includes(status)) throw new Error('Invalid status')

    const ticket = await this.repository.findOne({ where: { id } })
    if (ticket == null) throw new Error('Ticket not found')

    ticket.status = status
    await this.repository.save(ticket)
    return ticket
  }

  async findAll(options: FilterOpts = {}) {
    await this.init()
    const { offset = 0, limit = 20, status, joins, branch, from, to } = options

    const where: FindManyOptions<Ticket>['where'] = {
      status
    }
    if (branch != null) {
      where.invoice = { branch }
    }

    if (from != null || to != null) {
      where.createdAt = Between(from ?? new Date(), to ?? new Date())
    }

    return await this.repository.find({
      where,
      order: {
        createdAt: 'DESC'
      },
      relations: joins,
      take: limit,
      skip: offset
    })
  }

  async deleteById(id: number) {
    await this.init()
    const ticket = await this.repository.findOne({ where: { id } })
    if (ticket == null) throw new Error('Ticket not found')
    await this.repository.delete({ id })
    return ticket
  }
}
export const ticketRepository = new TicketRepository()
