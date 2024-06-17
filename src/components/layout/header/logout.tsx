'use client'
import { logoutAction } from '@/actions/auth/logout'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogOut() {
  const router = useRouter()
  return (
    <Button
      variant={'destructive'}
      size={'default'}
      className='w-fit'
      onClick={async () => {
        await logoutAction()
        router.refresh()
      }}
    >
      Cerrar sesion
      <LogOutIcon className='ml-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ' />
    </Button>
  )
}
