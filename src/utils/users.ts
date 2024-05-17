import {
  adminPass,
  editorPass,
  editorPass1,
  editorPass2,
  editorPass3,
  userPass,
  userPass1,
  userPass2,
  userPass3
} from './config'
import { Branch, Roles } from './types'

if (userPass == null || editorPass == null || adminPass == null) {
  throw new Error('Missing user, editor or admin password. Check .env file.')
}
// TODO: remove default passwords

export const USERS: Record<
  Roles,
  {
    role: Roles
    pass: Record<Branch, string>
  }
> = {
  [Roles.USER]: {
    role: Roles.USER,
    pass: {
      [Branch.ONE]: userPass1 ?? userPass,
      [Branch.TWO]: userPass2 ?? userPass,
      [Branch.THREE]: userPass3 ?? userPass
    }
  },
  [Roles.EDITOR]: {
    role: Roles.EDITOR,
    pass: {
      [Branch.ONE]: editorPass1 ?? editorPass,
      [Branch.TWO]: editorPass2 ?? editorPass,
      [Branch.THREE]: editorPass3 ?? editorPass
    }
  },
  [Roles.ADMIN]: {
    role: Roles.ADMIN,
    pass: {
      [Branch.ONE]: adminPass,
      [Branch.TWO]: adminPass,
      [Branch.THREE]: adminPass
    }
  }
}
