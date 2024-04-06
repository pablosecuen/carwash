import { Customer } from '../entities/customer'
import { type Vehicle } from '../entities'
import { BaseRepository } from './base-repository'
import { ILike } from 'typeorm'

export class CustomerRepository extends BaseRepository<Customer> {
  protected entity = Customer
  async create(data: { name: string; email: string; phone: string; address?: string }) {
    await this.init()
    const customer = this.repository.create(data)
    await this.repository.save(customer)
    return customer
  }

  async findAll() {
    await this.init()
    return await this.repository.find()
  }

  async findById(id: number) {
    await this.init()
    const customer = await this.repository.findOneBy({ id })
    if (customer == null) {
      // TODO: handler error properly
      throw new Error('Customer not found')
    }

    return customer
  }

  async addVehicle(customerId: number, vehicle: Vehicle) {
    await this.init()
    const customer = await this.repository.findOne({
      where: { id: customerId },
      relations: ['vehicles']
    })
    if (customer == null) {
      throw new Error('Customer not found')
    }
    customer.vehicles.push(vehicle)
    await this.repository.save(customer)
    return customer
  }

  async findByName(name: string) {
    await this.init()
    console.log('name', name)
    return await this.repository.findBy({
      name: ILike(`%${name}%`)
    })
  }
}

export const customerRepository = new CustomerRepository()
