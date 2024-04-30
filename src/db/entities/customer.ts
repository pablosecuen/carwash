import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { Vehicle } from './vehicle'
import { Branch } from '@/utils/types'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', {
    nullable: false,
    default: Branch.ONE
  })
  branch!: Branch

  @Column('varchar', {
    nullable: false
  })
  name!: string

  @Column('varchar', {
    nullable: true
  })
  email!: string

  @Column('varchar', {
    nullable: true
  })
  phone!: string

  @Column('varchar', {
    nullable: true
  })
  address!: string

  @Column('boolean', {
    default: false
  })
  currentAccount!: boolean

  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles!: Array<Relation<Vehicle>>
}
