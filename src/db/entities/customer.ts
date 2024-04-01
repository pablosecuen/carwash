import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
