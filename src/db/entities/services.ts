import type { VehicleType } from '@/utils/types'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn
} from 'typeorm'
import { Ticket } from './ticket'
@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  name!: string

  @Column('varchar', { nullable: true })
  description!: string | null

  @Column('int')
  cashPrice!: number

  @Column('int')
  cardPrice!: number

  @Column('simple-array')
  avaliableFor!: VehicleType[]

  @OneToMany(() => Ticket, (ticket) => ticket.service)
  tickets?: Array<Relation<Ticket>>

  @UpdateDateColumn()
  updatedAt!: Date
}
