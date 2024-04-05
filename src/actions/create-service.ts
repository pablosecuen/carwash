'use server'

import { serviceRepository } from '@/db/repositories/service'
import { VehicleType } from '@/utils/types'

export async function createServiceAction(formData: FormData) {
  const avaliableFor = Object.values(VehicleType).filter((type) =>
    formData.get(type)
  ) as VehicleType[]
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    cashPrice: parseInt(formData.get('cashPrice') as string),
    cardPrice: parseInt(formData.get('cardPrice') as string),
    avaliableFor
  }
  try {
    const service = await serviceRepository.create(data)
    console.log({ service })
  } catch (error) {
    console.error(error)
  }
}
