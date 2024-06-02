import { dbHost, dbName, dbPass, dbPort, dbUser } from '@/utils/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Customer, Vehicle } from './entities'
import { Product } from './entities/product'
import { Service } from './entities/services'
import { Ticket } from './entities/ticket'
import { Invoice } from './entities/invoice'
import { CashClosures } from './entities/cash-closures'
import { Item } from './entities/item'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbHost,
  port: Number(dbPort),
  username: dbUser,
  password: dbPass,
  database: dbName,
  ssl: { rejectUnauthorized: false },
  synchronize: true,
  logging: false,
  entities: [Customer, Vehicle, Product, Service, Ticket, Invoice, CashClosures, Item]
})
