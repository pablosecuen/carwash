import { type Service } from '../entities'
import { serviceRepository } from '../repositories/service'
import { VehicleType } from '@/utils/types'

const SERVICES: Array<Omit<Service, 'id' | 'updatedAt'>> = [
  {
    name: 'Lavado completo (auto)',
    description: 'Lavado completo de auto (uncluye lavado, aspirado y siliconado)',
    avaliableFor: [VehicleType.SEDAN],
    cashPrice: 7000,
    cardPrice: 8200
  },
  {
    name: 'Lavado completo (utilitario y vans)',
    description: 'Lavado completo de utilitario y vans (uncluye lavado, aspirado y siliconado)',
    avaliableFor: [VehicleType.VAN],
    cashPrice: 8000,
    cardPrice: 9500
  },
  {
    name: 'Lavado completo (camionetas)',
    description: 'Lavado completo de camionetas (uncluye lavado, aspirado y siliconado)',
    avaliableFor: [VehicleType.TRUCK],
    cashPrice: 10000,
    cardPrice: 11700
  },
  {
    name: 'Lavado completo (motocicletas)',
    description: 'Lavado completo de motocicletas (uncluye lavado, aspirado y siliconado)',
    avaliableFor: [VehicleType.MOTORCYCLE],
    cashPrice: 5500,
    cardPrice: 6500
  },
  {
    name: 'Lavado de motor',
    description: 'Lavado de motor',
    avaliableFor: [VehicleType.SEDAN, VehicleType.VAN, VehicleType.TRUCK],
    cashPrice: 5500,
    cardPrice: 6500
  },
  {
    name: 'Tapizados',
    description: 'Limpieza de tapizados',
    avaliableFor: [VehicleType.SEDAN, VehicleType.VAN, VehicleType.TRUCK],
    cashPrice: 34000,
    cardPrice: 39000
  },
  {
    name: 'Tapizado + Alfombras',
    description: 'Limpieza de tapizados y alfombras',
    avaliableFor: [VehicleType.SEDAN, VehicleType.VAN, VehicleType.TRUCK],
    cashPrice: 43000,
    cardPrice: 49450
  },
  {
    name: 'Tapizado + Alfombras + Techos',
    description: 'Limpieza de tapizados, alfombras y techos',
    avaliableFor: [VehicleType.SEDAN, VehicleType.VAN, VehicleType.TRUCK],
    cashPrice: 50000,
    cardPrice: 59000
  }
]

export async function createServices() {
  await Promise.all(
    SERVICES.map(async (service) => {
      await serviceRepository.create({
        ...service
      })
    })
  )
}
