import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation
} from 'typeorm'
import { Item } from './item'
import { Customer } from './customer'
import { Ticket } from './ticket'
import { Branch, type InvoiceStatus, InvoiceStatusEnum } from '@/utils/types'
import { CashClosures } from './cash-closures'

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('enum', { enum: Object.values(InvoiceStatusEnum), default: InvoiceStatusEnum.PENDING })
  status!: InvoiceStatus

  @Column('int')
  total!: number

  @Column('timestamp')
  createAt!: Date

  @Column('enum', { enum: Object.values(Branch), default: Branch.ONE })
  branch!: Branch

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer!: Customer

  @ManyToMany(() => Ticket, (ticket) => ticket.invoice)
  @JoinTable()
  tickets!: Ticket[]

  @OneToMany(() => Item, (item) => item.invoice)
  @JoinTable()
  items!: Relation<Item[]>

  @ManyToOne(() => CashClosures, (cashClosures) => cashClosures.id, {
    nullable: true
  })
  cashClosure?: Relation<CashClosures> | null
}
