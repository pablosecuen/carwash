import { dbHost, dbName, dbPass, dbPort, dbUser } from '@/utils/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Customer } from './entities/customer'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbHost,
  port: Number(dbPort),
  username: dbUser,
  password: dbPass,
  database: dbName,
  synchronize: true,
  logging: false,
  entities: [Customer]
})
