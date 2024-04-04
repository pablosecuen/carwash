import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './product'
import { Service } from './services'
import { Customer } from './customer'

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

  @ManyToMany(() => Service, (service) => service.id)
  services!: Service[]

  @ManyToMany(() => Product, (product) => product.id)
  products!: Product[]
}
