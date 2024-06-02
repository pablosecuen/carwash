/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Branch, PaymentMethod, Roles, VehicleType } from './types'

export const SHOW_ROLES: Record<Roles, string> = {
  [Roles.USER]: 'Usuario',
  [Roles.EDITOR]: 'Manager',
  [Roles.ADMIN]: 'Administrador'
}

export const VEHICLE_TYPES: Record<VehicleType, string> = {
  [VehicleType.SEDAN]: 'Auto',
  [VehicleType.VAN]: 'Van',
  [VehicleType.MOTORCYCLE]: 'Moto',
  [VehicleType.TRUCK]: 'Camioneta'
}

export const BRANCHES = {
  [Branch.ONE]: 'Sucursal 1',
  [Branch.TWO]: 'Sucursal 2',
  [Branch.THREE]: 'Sucursal 3'
}

export const PAYMENT_METHODS = {
  [PaymentMethod.CASH]: 'Efectivo',
  [PaymentMethod.CARD]: 'Tarjeta'
}
