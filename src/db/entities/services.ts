import type { VehicleType } from '@/utils/types'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
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
}
