import { Customer } from '../entities/customer'
import { type Vehicle } from '../entities'
import { BaseRepository } from './base-repository'
import { ILike } from 'typeorm'
import { type Branch } from '@/utils/types'

interface FilterOpts {
  name?: string
  branch?: Branch
  limit?: number
  offset?: number
  currentAccount?: boolean
  joins?: {
    vehicles?: boolean
  }
  sort?: {
    sortBy?: string
    orderDir?: 'ASC' | 'DESC'
  }
}
export class CustomerRepository extends BaseRepository<Customer> {
  protected entity = Customer
  async create(data: Omit<Customer, 'id' | 'vehicles' | 'currentAccount'>) {
    await this.init()
    const customer = this.repository.create(data)
    await this.repository.save(customer)
    return customer
  }

  async findAll(filter?: FilterOpts) {
    const { branch, limit = 20, offset = 0, sort } = filter ?? {}
    await this.init()
    const whereClause = {
      branch,
      currentAccount: filter?.currentAccount ?? undefined,
      name: ILike(`%${filter?.name ?? ''}%`)
    }
    const [customers, count] = await Promise.all([
      this.repository.find({
        where: whereClause,
        take: limit,
        relations: {
          vehicles: filter?.joins?.vehicles ?? false
        },
        skip: offset,
        order: this.formatSort(sort)
      }),
      this.repository.count({ where: whereClause })
    ])
    return {
      customers,
      metadata: this.formatMetadataForPagination({ count, limit, offset })
    }
  }

  private formatSort(sort: { sortBy?: string; orderDir?: 'ASC' | 'DESC' } = {}) {
    if (sort?.sortBy == null) return undefined

    return {
      [sort.sortBy]: sort.orderDir ?? 'DESC'
    }
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

  async findByName(name: string, filter?: FilterOpts) {
    const { branch, limit = 20, offset = 0 } = filter ?? {}
    await this.init()
    return await this.repository.find({
      where: {
        name: ILike(`%${name}%`),
        branch
      },
      take: limit,
      skip: offset
    })
  }

  async updateById(id: number, data: Partial<Customer>) {
    await this.init()
    await this.repository.update({ id }, { ...data, id })
  }

  async updateCurrentAccountById({
    id: customerId,
    currentAccount
  }: {
    id: number
    currentAccount: boolean
  }) {
    await this.init()
    await this.repository.update({ id: customerId }, { currentAccount })
  }

  async deleteById(id: number) {
    await this.init()
    await this.repository.delete({ id })
  }
}

export const customerRepository = new CustomerRepository()
