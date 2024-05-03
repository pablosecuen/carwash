'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Roles, type NavItem } from '@/utils/types'
import { type Dispatch, type SetStateAction } from 'react'
import { Icons } from './icons'

interface DashboardNavProps {
  items: NavItem[]
  setOpen?: Dispatch<SetStateAction<boolean>>
  role: Roles
}

export function DashboardNav({ items, setOpen, role }: DashboardNavProps) {
  const path = usePathname()

  if (items?.length === 0) {
    return null
  }

  return (
    <nav className='grid items-start gap-2 py-5'>
      {items.map((item, index) => {
        const Icon = Icons[item.title.toLocaleLowerCase()]

        return (
          item.href != null && (
            <Link
              key={index}
              href={item.disabled === true ? '/' : item.href}
              onClick={() => {
                if (setOpen != null) setOpen(false)
              }}
              className={item.role.includes(Roles[role]) ? 'block' : 'hidden'}
            >
              <span
                className={cn(
                  'group flex flex-col items-start rounded-md px-3 py-2 text-sm font-medium transition-all duration-75 hover:bg-accent hover:text-accent-foreground',
                  path.startsWith(item.href)
                    ? 'bg-accent font-bold shadow-lg  '
                    : 'transparent shadow-sm',
                  item.disabled === true && 'cursor-not-allowed opacity-80'
                )}
              >
                <div className='flex items-center'>
                  <Icon className='mr-2 h-4 w-4' />
                  <span>{item.title}</span>
                </div>
                <small>{item.label}</small>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
