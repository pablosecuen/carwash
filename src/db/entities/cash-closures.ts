import { Branch } from '@/utils/types'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm'
import { Invoice } from './invoice'

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

  @Column('int')
  totalDailyCash!: number

  @Column('int', { default: 0 })
  totalCanceled!: number

  @Column('int', { default: 0 })
  totalCash!: number

  @Column('int', { default: 0 })
  totalCard!: number

  @Column('int', {
    nullable: false
  })
  dailyPercentage!: number

  @Column('int')
  managerBonus!: number

  @Column('int', { default: 0 })
  employeeBonus!: number

  @Column('int')
  employeePayment!: number

  @Column('int', { default: 0 })
  employeesNum!: number

  @OneToMany(() => Invoice, (invoice) => invoice.cashClosure)
  invoices!: Relation<Invoice[]>

  @Column('date', { default: new Date() })
  createdAt!: Date
}
