import { PaymentMethod } from '@/utils/types'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { Product } from './product'
import { Invoice } from './invoice'

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('enum', { enum: Object.values(PaymentMethod), default: PaymentMethod.CASH })
  paymentMethod!: PaymentMethod

  @Column('int')
  totalPrice!: number

  @ManyToOne(() => Product, (product) => product.id)
  product!: Relation<Product>

  @ManyToOne(() => Invoice, (invoice) => invoice.items, { nullable: true })
  invoice?: Relation<Invoice>

  @Column('timestamp')
  createdAt!: Date
}
