import { PaymentMethod } from '@/utils/types'
import { Ticket } from '../entities/ticket'
import { BaseRepository } from './base-repository'

export class TicketRepository extends BaseRepository<Ticket> {
  protected entity = Ticket

  async create(data: Omit<Ticket, 'id' | 'createdAt' | 'totalPrice' | 'status'>) {
    await this.init()
    const totalPrice =
      data.paymentMethod === PaymentMethod.CARD ? data.service.cardPrice : data.service.cashPrice
    const ticket = this.repository.create({
      ...data,
      totalPrice,
      createdAt: new Date()
    })
    await this.repository.save(ticket)
    return ticket
  }
}
export const ticketRepository = new TicketRepository()
