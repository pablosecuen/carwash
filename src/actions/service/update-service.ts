import { serviceRepository } from '@/db/repositories/service'
import { VEHICLE_TYPES } from '@/utils/constants'
import { type VehicleType } from '@/utils/types'

export function updateServiceAction(serviceId: string | number) {
  return async function (formData: FormData) {
    'use server'
    if (serviceId == null) {
      return
    }
    const avaliableFor = Object.keys(VEHICLE_TYPES).filter(
      (key) => formData.get(key) === 'on'
    ) as VehicleType[]
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      cashPrice: Number(formData.get('cashPrice')),
      cardPrice: Number(formData.get('cardPrice')),
      avaliableFor
    }
    try {
      const service = await serviceRepository.update(Number(serviceId), data)
      console.log({ service })
    } catch (error) {
      console.error(error)
    }
  }
}
