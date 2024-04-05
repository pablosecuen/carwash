import { Service } from '../entities/services'
import { BaseRepository } from './base-repository'

export class ServiceRepostiory extends BaseRepository<Service> {
  protected entity = Service

  async create(data: Omit<Service, 'id'>) {
    await this.init()
    const service = this.repository.create(data)
    await this.repository.save(service)
    return service
  }
}

export const serviceRepository = new ServiceRepostiory()
