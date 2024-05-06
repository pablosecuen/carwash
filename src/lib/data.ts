// TODO: Fixear los items para los que requiere la App

import { type NavItem } from '@/utils/types'

// TODO: Agregar los icon para cada item
export const navItems: NavItem[] = [
  {
    title: 'Caja',
    href: '/service',
    label: 'Servicios que brindamos',
    role: ['ADMIN', 'EDITOR', 'USER']
  },
  {
    title: 'Gerencia',
    href: '/manager',
    label: 'Gerencia de la sucursal',
    role: ['ADMIN', 'EDITOR']
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    label: 'Dashboard de administrador',
    role: ['ADMIN']
  }
]
