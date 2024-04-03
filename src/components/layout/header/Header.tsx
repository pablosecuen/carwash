import { cn } from '@/lib/utils'
import { ToggleTheme } from '../theme/ToggleTheme'
import { MobileSidebar } from '@/components/layout'

export const Header = () => {
  return (
    <div className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20'>
      <nav className='h-14 flex items-center justify-between px-4'>
        <div className='hidden lg:block'>
          {/* TODO: poner logo de la empresa */}
          <img
            className=' h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className='flex items-center gap-2'>
          {/* <UserNav /> */}
          <ToggleTheme />
        </div>
      </nav>
    </div>
  )
}
