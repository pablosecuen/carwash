'use client'

import { usePathname } from 'next/navigation'
import { Button } from '../../ui/button'
import Link from 'next/link'

interface Props {
  path: string
  icon: React.ReactNode
  title: string
  subtitle?: string
}

export const SidebarItem = ({ path, icon, title, subtitle }: Props) => {
  const pathname = usePathname()
  return (
    <Button variant='default' asChild className='w-full justify-start'>
      <Link href={path}>
        {icon}
        {title}
      </Link>
    </Button>
  )
}
