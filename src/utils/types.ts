export enum Roles {
  USER = 'USER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN'
}

export type TRole = Roles.USER | Roles.EDITOR | Roles.ADMIN

export enum VehicleType {
  CAR = 'car',
  MOTORCYCLE = 'motorcycle',
  TRUCK = 'truck'
}

export type TVehicleType = VehicleType.CAR | VehicleType.MOTORCYCLE | VehicleType.TRUCK
