import { customerRepository } from '@/db/repositories/customer'
import { vehicleRepository } from '@/db/repositories/vehicle'
import { type VehicleType } from '@/utils/types'

export async function customerAddVehicle(customerId: number) {
  return async function (formData: FormData) {
    'use server'
    // TODO: validate formData
    const data = {
      type: formData.get('type') as VehicleType,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      year: Number(formData.get('year')),
      patent: formData.get('patent') as string,
      customerId
    }
    try {
      // TODO: handler possible errors
      const vehicle = await vehicleRepository.create(data)
      if (vehicle == null) {
        throw new Error('Error creating vehicle')
      }
      const customer = await customerRepository.addVehicle(customerId, vehicle)
      console.log({ customer, vehicle })
    } catch (error) {
      console.error('Error adding vehicle to customer:', error)
    }
  }
}
