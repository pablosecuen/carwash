import {
  adminPass,
  editorPass1,
  editorPass2,
  editorPass3,
  userPass1,
  userPass2,
  userPass3
} from './config'
import { Branch, Roles } from './types'

if (
  userPass1 == null ||
  userPass2 == null ||
  userPass3 == null ||
  editorPass1 == null ||
  editorPass2 == null ||
  editorPass3 == null ||
  adminPass == null
) {
  throw new Error('Missing user, editor or admin password. Check .env file.')
}

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
      [Branch.ONE]: userPass1,
      [Branch.TWO]: userPass2,
      [Branch.THREE]: userPass3
    }
  },
  [Roles.EDITOR]: {
    role: Roles.EDITOR,
    pass: {
      [Branch.ONE]: editorPass1,
      [Branch.TWO]: editorPass2,
      [Branch.THREE]: editorPass3
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
