'use server'

import { VEHICLE_TYPES } from '@/utils/constants'

export async function createServiceAction(formData: FormData) {
  const avaliableFor = Object.keys(VEHICLE_TYPES).filter((type) => formData.get(type))
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    cashPrice: parseInt(formData.get('cashPrice') as string),
    cardPrice: parseInt(formData.get('cardPrice') as string),
    avaliableFor
  }
  console.log({ data })
}
