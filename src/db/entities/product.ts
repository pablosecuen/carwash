import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('products')
export class Product {
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
}
