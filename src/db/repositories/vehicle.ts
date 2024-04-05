import { Vehicle } from '../entities'
import { type VehicleType } from '@/utils/types'
import { BaseRepository } from './base-repository'

export class VehicleRepository extends BaseRepository<Vehicle> {
  protected entity = Vehicle

  async create(data: {
    type: VehicleType
    brand: string
    model: string
    year: number
    patent: string
    customerId: number
  }) {
    await this.init()
    // TODO: validate
    try {
      const vehicle = this.repository.create(data)
      await this.repository.save(vehicle)
      return vehicle
    } catch (error) {
      console.error('Error creating vehicle:', error)
    }
  }

  async findById(id: number | string) {
    await this.init()
    const vehicle = await this.repository.findOne({
      where: { id: Number(id) }
    })
    if (vehicle == null) {
      throw new Error('Vehicle not found')
    }
    return vehicle
  }

  async findByCustomerId(customerId: number) {
    await this.init()
    const vehicles = await this.repository
      .createQueryBuilder()
      .where('"customerId" = :customerId', { customerId })
      .getMany()

    return vehicles
  }
}

export const vehicleRepository = new VehicleRepository()
