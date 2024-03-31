export enum Roles {
  USER = 'USER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN'
}

export type TRole = Roles.USER | Roles.EDITOR | Roles.ADMIN
