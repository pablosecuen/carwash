import { cn } from '@/lib/utils'
import { ToggleTheme } from '../theme/ToggleTheme'
import { LogOut } from './logout'
import { MobileSidebarServer } from '../sidebar/mobile-sidebar-server'
import { getUserRole } from '@/utils/user-validate'
import { cookies } from 'next/headers'
import { BRANCHES, SHOW_ROLES } from '@/utils/constants'
import { type Branch } from '@/utils/types'

export const Header = async () => {
  const role = await getUserRole()
  const branch = cookies().get('branch')?.value as Branch
  return (
    <div className='supports-backdrop-blur:bg-background/60  fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur'>
      <nav className='flex h-14 items-center justify-between px-4 lg:px-8'>
        <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-start lg:gap-x-24'>
          {/* TODO: poner logo de la empresa */}
          <div className='flex items-center gap-2'>
            <img className=' h-10 w-auto' src='/carwash-logo.webp' alt='Your Company' />

            <h1 className='text-xl font-semibold tracking-wide'>Carwash</h1>
          </div>

          <small>
            Ingreso como <span className='font-bold uppercase'>{SHOW_ROLES[role]}</span>, en
            sucursal <span className='font-bold uppercase'>{BRANCHES[branch]}</span>
          </small>
        </div>
        <div className={cn('flex flex-1 items-center gap-5 lg:!hidden')}>
          <MobileSidebarServer />

          <small>
            <span className='hidden md:block'>Ingreso como</span>{' '}
            <span className='font-bold uppercase'>{SHOW_ROLES[role]}</span> en{' '}
            <span className='font-bold uppercase'>{BRANCHES[branch]}</span>
          </small>
        </div>

        <div className='flex items-center gap-2'>
          {/* <UserNav /> */}
          <ToggleTheme />
          <LogOut />
        </div>
      </nav>
    </div>
  )
}
