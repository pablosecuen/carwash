'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { HelpCircleIcon, MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { DashboardNav } from '../dashboard-nav'
import { navItems } from '@/lib/data'
import { type Roles } from '@/utils/types'
import Link from 'next/link'

// import { Playlist } from "../data/playlists";

interface SidebarProps {
  role: Roles
}

export function MobileSidebar({ role }: SidebarProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col items-start justify-between !px-0'>
          <div className='w-full space-y-4 py-4'>
            <div className='px-3 py-2'>
              <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Carwash</h2>
              <div className='space-y-1'>
                <DashboardNav items={navItems} setOpen={setOpen} role={role} />
              </div>
            </div>
          </div>
          <div className='w-full space-y-4 px-3'>
            <Link
              href={'/'}
              onClick={() => {
                if (setOpen != null) setOpen(false)
              }}
              className={''}
            >
              <span
                className={
                  'group flex flex-col items-start rounded-md px-3 py-2 text-sm font-medium transition-all duration-75 hover:bg-accent hover:text-accent-foreground'
                }
              >
                <div className='flex items-center'>
                  <HelpCircleIcon className='mr-2 h-4 w-4' />
                  <span>Ayuda</span>
                </div>
                <small>Blog sobre el sistema.</small>
              </span>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
