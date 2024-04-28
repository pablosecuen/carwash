'use client'
import { logoutAction } from '@/actions/auth/logout'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogOut() {
  const router = useRouter()
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={async () => {
        await logoutAction()
        router.refresh()
      }}
    >
      <LogOutIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ' />
    </Button>
  )
}
