/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { adminPass, editorPass, userPass } from './config'
import { NavItem, Roles, VehicleType } from './types'

if (userPass == null || editorPass == null || adminPass == null) {
  throw new Error('Missing user, editor or admin password. Check .env file.')
}

export const USERS: Record<
  Roles,
  {
    role: Roles
    pass: string
  }
> = {
  [Roles.USER]: {
    role: Roles.USER,
    pass: userPass
  },
  [Roles.EDITOR]: {
    role: Roles.EDITOR,
    pass: editorPass
  },
  [Roles.ADMIN]: {
    role: Roles.ADMIN,
    pass: adminPass
  }
}

export const SHOW_ROLES: Record<Roles, string> = {
  [Roles.USER]: 'Usuario',
  [Roles.EDITOR]: 'Editor',
  [Roles.ADMIN]: 'Administrador'
}

export const VEHICLE_TYPES = {
  [VehicleType.CAR]: 'Auto',
  [VehicleType.MOTORCYCLE]: 'Moto',
  [VehicleType.TRUCK]: 'Camion'
}

// TODO: Fixear los items para los que requiere la App
// TODO: Agregar los icon para cada item
export const navItems: NavItem[] = [
  {
    title: 'Clientes',
    href: '/customer/dashboard',
    label: 'Dashboard'
  }
]
