'use server'
import { customerRepository } from '@/db/repositories/customer'
import { vehicleRepository } from '@/db/repositories/vehicle'
import { formatSlugFromCustomer } from '@/utils/slug'
import { type VehicleType } from '@/utils/types'
import { revalidatePath } from 'next/cache'

export async function customerAddVehicle(customerId: number, formData: FormData) {
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
    const vehicle = await vehicleRepository.create(data)
    if (vehicle == null) {
      throw new Error('Error creating vehicle')
    }
    const customer = await customerRepository.addVehicle(customerId, vehicle)
    revalidatePath(`/service/customers/${formatSlugFromCustomer(customer)}`)
  } catch (error) {
    console.error('Error adding vehicle to customer:', error)
  }
}
