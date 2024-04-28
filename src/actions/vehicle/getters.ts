import { type Vehicle } from '@/db/entities'
import { vehicleRepository } from '@/db/repositories/vehicle'

// TODO: send error to client properly
export const getByCustomerId = async (customerId: number | undefined) => {
  try {
    const vehicles =
      customerId != null && !isNaN(Number(customerId))
        ? await vehicleRepository.findByCustomerId(customerId)
        : []
    return JSON.parse(JSON.stringify(vehicles)) as Vehicle[]
  } catch (error) {
    console.error(error)
    return []
  }
}
