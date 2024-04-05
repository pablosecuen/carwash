import { serviceRepository } from '@/db/repositories/service'

export const getAllServices = async () => {
  try {
    const services = await serviceRepository.findAll()
    return services
  } catch (error) {
    console.error(error)
    return []
  }
}
