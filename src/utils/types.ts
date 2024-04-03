import { ReactNode } from 'react'
export enum Roles {
  USER = 'USER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN'
}

export type TRole = Roles.USER | Roles.EDITOR | Roles.ADMIN

export enum VehicleType {
  SEDAN = 'sedan',
  VAN = 'van',
  TRUCK = 'truck',
  MOTORCYCLE = 'motorcycle'
}

export type TVehicleType =
  | VehicleType.SEDAN
  | VehicleType.SEDAN
  | VehicleType.MOTORCYCLE
  | VehicleType.TRUCK

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: ReactNode
  label?: string
  description?: string
}
