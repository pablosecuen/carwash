import { vehicleRepository } from '@/db/repositories/vehicle'

// TODO: send error to client properly
export const getByCustomerId = async (customerId: number) => {
  try {
    const vehicles = await vehicleRepository.findByCustomerId(customerId)
    return vehicles
  } catch (error) {
    console.error(error)
    return []
  }
}
