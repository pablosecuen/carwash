// TODO: Fixear los items para los que requiere la App

import { type NavItem } from '@/utils/types'

// TODO: Agregar los icon para cada item
export const navItems: NavItem[] = [
  {
    title: 'Caja',
    href: '/service',
    label: 'Dashboard',
    role: ['ADMIN', 'EDITOR', 'USER']
  },
  {
    title: 'Clientes',
    href: '/customer/dashboard',
    label: 'Dashboard',
    role: ['ADMIN', 'EDITOR']
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    label: 'Dashboard',
    role: ['ADMIN', 'EDITOR']
  }
]
