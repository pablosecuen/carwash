import { adminPass, editorPass, userPass } from './config'
import { Roles } from './types'

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