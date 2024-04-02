import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { Customer } from './customer'

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number

  // TODO: ask for all the possible values
  @Column('enum', { enum: ['car', 'motorcycle', 'truck'] })
  type!: string

  @Column('varchar')
  model!: string

  @Column('varchar')
  brand!: string

  @Column('int')
  year!: number

  @Column('varchar')
  patent!: string

  @ManyToOne(() => Customer, (customer) => customer.vehicles)
  customer!: Relation<Customer>
}
