import type { ReactNode } from 'react'
export enum Roles {
  USER = 'USER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN'
}

export type TRole = keyof typeof Roles

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

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card'
}

export type TPaymentMethod = PaymentMethod.CASH | PaymentMethod.CARD

export enum TicketStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export type TTicketStatus = TicketStatus.PENDING | TicketStatus.COMPLETED | TicketStatus.CANCELLED

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: ReactNode
  label?: string
  description?: string
  role: TRole[]
}

export enum Branch {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE'
}

export type TBranch = keyof typeof Branch

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any
