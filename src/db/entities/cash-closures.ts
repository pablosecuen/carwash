import { Branch } from '@/utils/types'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cash_closures')
export class CashClosures {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', {
    nullable: false
  })
  branch!: Branch

  @Column('int')
  totalDaily!: number

  @Column('int', {
    nullable: false
  })
  dailyPercentage!: number

  @Column('int')
  managerBonus!: number

  @Column('int')
  employeePayment!: number

  @Column('date', { default: new Date() })
  createdAt!: Date
}
