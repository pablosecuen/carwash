import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product'
import { Customer } from './customer'
import { Ticket } from './ticket'
import { Branch } from '@/utils/types'

type InvoiceStatus = 'in-progress' | 'pending' | 'completed' | 'cancelled'

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('enum', { enum: ['in-progress', 'pending', 'completed', 'cancelled'] })
  status!: InvoiceStatus

  @Column('int')
  total!: number

  @Column('timestamp')
  createAt!: Date

  @Column('enum', { enum: Object.values(Branch), default: Branch.ONE })
  branch!: Branch

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer!: Customer

  @ManyToMany(() => Ticket, (ticket) => ticket.id)
  @JoinTable()
  tickets!: Ticket[]

  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable()
  products!: Product[]
}
