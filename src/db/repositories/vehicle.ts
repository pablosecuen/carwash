import { Repository } from 'typeorm'
import { Vehicle } from '../entities'
import { AppDataSource } from '../data-source'
import { VehicleType } from '@/utils/types'

export class VehicleRepository {
  private vehicle!: Repository<Vehicle>
  private isInicializated: boolean = false
  async init() {
    if (this.isInicializated) return
    try {
      if (!AppDataSource.isInitialized) await AppDataSource.initialize()
      this.vehicle = AppDataSource.getRepository(Vehicle)
      this.isInicializated = true
    } catch (error) {
      // TODO: handler error properly
      console.error('Error initializing AppDataSource', error)
      throw error
    }
  }

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
      const vehicle = this.vehicle.create(data)
      console.log('Vehicle created:', { vehicle })
      await this.vehicle.save(vehicle)
      return vehicle
    } catch (error) {
      console.error('Error creating vehicle:', error)
    }
  }
}

export const vehicleRepository = new VehicleRepository()
