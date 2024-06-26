import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { Vehicle } from './vehicle'
import { Service } from './services'
import { PaymentMethod, TicketStatus } from '@/utils/types'
import { Invoice } from './invoice'

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('enum', { enum: Object.values(TicketStatus), default: TicketStatus.PENDING })
  status!: TicketStatus

  @Column('enum', { enum: Object.values(PaymentMethod), default: PaymentMethod.CASH })
  paymentMethod!: PaymentMethod

  @Column('int')
  totalPrice!: number

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle!: Vehicle

  @ManyToOne(() => Service, (service) => service.id, { nullable: true })
  service?: Relation<Service>

  @ManyToOne(() => Invoice, (invoice) => invoice.tickets, { nullable: true })
  invoice?: Relation<Invoice>

  @Column('timestamp')
  createdAt!: Date
}
