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
      <LogOutIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ' />
    </Button>
  )
}
