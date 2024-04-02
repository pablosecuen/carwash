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
      // TODO: handler error properly
      console.error('Error initializing AppDataSource', error)
      throw error
    }
  }

  async create(data: { name: string; email: string; phone: string; address?: string }) {
    await this.init()
    const customer = this.customer.create(data)
    await this.customer.save(customer)
    return customer
  }

  async findAll() {
    await this.init()
    return this.customer.find()
  }

  async findById(id: number) {
    await this.init()
    const customer = await this.customer.findOneBy({ id })
    if (!customer) {
      // TODO: handler error properly
      throw new Error('Customer not found')
    }

    return customer
  }
}

export const customerRepository = new CustomerRepository()
