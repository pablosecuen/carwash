'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { DashboardNav } from '../dashboard-nav'
import { navItems } from '@/lib/data'
import { type Roles } from '@/utils/types'

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
        <SheetContent side='left' className='!px-0'>
          <div className='space-y-4 py-4'>
            <div className='px-3 py-2'>
              <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Overview</h2>
              <div className='space-y-1'>
                <DashboardNav items={navItems} setOpen={setOpen} role={role} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
