import { type VehicleType } from '@/utils/types'
import { Service } from '../entities/services'
import { BaseRepository } from './base-repository'

export class ServiceRepostiory extends BaseRepository<Service> {
  protected entity = Service

  async create(data: Omit<Service, 'id' | 'updatedAt'>) {
    await this.init()
    const service = this.repository.create(data)
    await this.repository.save(service)
    return service
  }

  async findAll() {
    await this.init()
    return await this.repository.find()
  }

  async findById(id: number) {
    await this.init()
    const service = await this.repository.findOneBy({ id })
    if (service == null) {
      throw new Error('Service not found')
    }

    return service
  }

  async findAllByAvaliability(type: VehicleType) {
    await this.init()
    const service = await this.repository.find({ where: { avaliableFor: type } })
    if (service == null) {
      throw new Error('Service not found')
    }

    return service
  }

  async update(id: number, data: Partial<Service>) {
    await this.init()
    await this.repository.update(id, data)
    const service = await this.repository.findOneBy({ id })
    if (service == null) {
      throw new Error('Service not found')
    }
    return service
  }

  async delete(id: number) {
    try {
      await this.init()
      const service = await this.repository.findOne({
        where: { id },
        relations: {
          tickets: true
        }
      })
      if (service == null) {
        throw new Error('Service not found')
      }
      service.tickets = []
      await this.repository.save(service)

      await this.repository.remove(service)
    } catch (error) {
      console.error('Error deleting service:', error)
      throw new Error('Error deleting service')
    }
  }
}

export const serviceRepository = new ServiceRepostiory()
