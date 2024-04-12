'use client'
import { logoutAction } from '@/actions/logout'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'

export function LogOut() {
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={async () => {
        await logoutAction()
      }}
    >
      <LogOutIcon />
    </Button>
  )
}
