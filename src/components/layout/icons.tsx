import {
  CreditCard,
  Hammer,
  Loader2,
  LucideIcon,
  Plus,
  Settings,
  User,
  User2Icon,
  X
} from 'lucide-react'

export type IconName =
  | 'close'
  | 'profile'
  | 'spinner'
  | 'settings'
  | 'billing'
  | 'add'
  | 'user'
  | 'caja'
  | 'clientes'

interface IconsMap {
  [key: string]: LucideIcon
}

export const Icons: IconsMap = {
  close: X,
  profile: User2Icon,
  spinner: Loader2,
  settings: Settings,
  billing: CreditCard,
  add: Plus,
  user: User,
  caja: Hammer,
  clientes: User2Icon
}
