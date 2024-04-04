import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Vehicle } from '.'
import { Service } from './services'

// TODO: move
type TicketStatus = 'pending' | 'completed' | 'canceled'
type PaymentMethod = 'cash' | 'card'
@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('enum', { enum: ['pending', 'completed', 'canceled'] })
  status!: TicketStatus

  @Column('enum', { enum: ['cash', 'card'] })
  paymentMethod!: PaymentMethod

  @Column('int')
  totalPrice!: number

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle!: Vehicle

  @ManyToOne(() => Service, (service) => service.id)
  service!: Service

  @Column('timestamp')
  createdAt!: Date
}
