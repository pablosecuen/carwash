import { type Service } from '@/db/entities/services'
import { serviceRepository } from '@/db/repositories/service'

// TODO: handle errors
export const getAllServices = async () => {
  try {
    const services = await serviceRepository.findAll()
    return services
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getServiceById = async (id: string | number) => {
  try {
    const service = await serviceRepository.findById(Number(id))

    return JSON.parse(JSON.stringify(service)) as Service
  } catch (error) {
    console.error(error)
    return null
  }
}
