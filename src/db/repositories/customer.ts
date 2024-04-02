import { type Repository } from 'typeorm'
import { Customer } from '../entities/customer'
import { AppDataSource } from '../data-source'

export class CustomerRepository {
  private customer!: Repository<Customer>
  private isInicializated: boolean = false
  async init() {
    if (this.isInicializated) return
    try {
      await AppDataSource.initialize()
      this.customer = AppDataSource.getRepository(Customer)
      this.isInicializated = true
    } catch (error) {
      console.error('Error initializing AppDataSource', error)
    }
  }

  async create(data: { name: string; email: string; phone: string; address?: string }) {
    await this.init()
    const customer = this.customer.create(data)
    await this.customer.save(customer)
    return customer
  }
}

export const customerRepository = new CustomerRepository()
