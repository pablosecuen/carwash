import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Vehicle } from './vehicle'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
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

  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer, {
    cascade: true
  })
  vehicles!: Relation<Vehicle>[]
}
