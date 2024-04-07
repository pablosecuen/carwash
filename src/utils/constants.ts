/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Roles, VehicleType } from './types'

export const SHOW_ROLES: Record<Roles, string> = {
  [Roles.USER]: 'Usuario',
  [Roles.EDITOR]: 'Editor',
  [Roles.ADMIN]: 'Administrador'
}

export const VEHICLE_TYPES = {
  [VehicleType.SEDAN]: 'Auto',
  [VehicleType.VAN]: 'Van',
  [VehicleType.MOTORCYCLE]: 'Moto',
  [VehicleType.TRUCK]: 'Camioneta'
}
