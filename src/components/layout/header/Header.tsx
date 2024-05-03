import { cn } from '@/lib/utils'
import { ToggleTheme } from '../theme/ToggleTheme'
import { LogOut } from './logout'
import { MobileSidebarServer } from '../sidebar/mobile-sidebar-server'
import { getUserRole } from '@/utils/user-validate'
import { cookies } from 'next/headers'

export const Header = async () => {
  const role = await getUserRole()
  const branch = cookies().get('branch')?.value
  return (
    <div className='supports-backdrop-blur:bg-background/60  fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur'>
      <nav className='flex h-14 items-center justify-between px-4'>
        <div className='hidden lg:flex lg:items-center lg:gap-x-2'>
          {/* TODO: poner logo de la empresa */}
          <img className=' h-10 w-auto' src='/carwash-logo.webp' alt='Your Company' />

          <h1 className='text-xl font-semibold tracking-wide'>Carwash</h1>
          <small>
            Ingreso como {role}, en sucursal {branch}
          </small>
        </div>
        <div className={cn('flex flex-1 items-center gap-5 lg:!hidden')}>
          <MobileSidebarServer />
          <small>
            Ingreso como {role}, en sucursal {branch}
          </small>
        </div>

        <div className='flex items-center gap-2'>
          {/* <UserNav /> */}
          <LogOut />
          <ToggleTheme />
        </div>
      </nav>
    </div>
  )
}
