import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product'
import { Customer } from './customer'
import { Ticket } from './ticket'

type InvoiceStatus = 'in-progress' | 'pending' | 'completed' | 'canceled'

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('enum', { enum: ['in-progress', 'pending', 'completed', 'canceled'] })
  status!: InvoiceStatus

  @Column('int')
  total!: number

  @Column('timestamp')
  createAt!: Date

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer!: Customer

  @ManyToMany(() => Ticket, (ticket) => ticket.id)
  @JoinTable()
  tickets!: Ticket[]

  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable()
  products!: Product[]
}
