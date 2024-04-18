import { getUserRole } from '@/utils/user-validate'
import React from 'react'
import { MobileSidebar } from './mobile-sidebar'

export const MobileSidebarServer = async () => {
  const role = await getUserRole()
  return (
    <>
      <MobileSidebar role={role} />
    </>
  )
}
