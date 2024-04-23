import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { Customer } from './customer'
import { VehicleType } from '@/utils/types'

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number

  // TODO: ask for all the possible values
  @Column('enum', { enum: VehicleType })
  type!: VehicleType

  @Column('varchar')
  model!: string

  @Column('varchar')
  brand!: string

  @Column('int')
  year!: number

  @Column('varchar')
  patent!: string

  @ManyToOne(() => Customer, (customer) => customer.vehicles, {
    onDelete: 'CASCADE'
  })
  customer!: Relation<Customer>
}
