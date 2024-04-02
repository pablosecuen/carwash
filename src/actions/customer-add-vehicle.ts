import { VehicleType } from '@/utils/types'

export async function customerAddVehicle(customerId: number) {
  return async function (formData: FormData) {
    'use server'
    const data = {
      type: formData.get('type') as VehicleType,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      year: Number(formData.get('year')),
      patent: formData.get('patent') as string,
      customerId
    }
    console.log('Adding vehicle to customer:', data)
  }
}
