'use server'

import { serviceRepository } from '@/db/repositories/service'
import { VEHICLE_TYPES } from '@/utils/constants'
import { type VehicleType } from '@/utils/types'
import { revalidatePath } from 'next/cache'

export async function updateServiceAction(
  serviceId: number,
  formData: FormData
) {
  if (serviceId == null) {
    return {
      ok: false
    }
  }
  const avaliableFor = Object.keys(VEHICLE_TYPES).filter(
    (key) => formData.get(key) === 'true'
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
    revalidatePath('dashboard/services')
    return {
      ok: true,
      service: JSON.parse(JSON.stringify(service)),
      message: 'Servicio actualizado'
    }
  } catch (error) {
    return {
      ok: false,
      service: {},
      message: 'Servicio actualizado'
    }
  }
}
