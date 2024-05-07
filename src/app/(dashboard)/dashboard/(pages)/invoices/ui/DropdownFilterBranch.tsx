'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ListFilter } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DropdownFilterBranch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const filterBranch = (branch: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('branch', branch)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
          <ListFilter className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only'>sucursal</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          onClick={() => {
            filterBranch('ONE')
          }}
        >
          Sucursal 1
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => {
            filterBranch('TWO')
          }}
        >
          Sucursal 2
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => {
            filterBranch('THREE')
          }}
        >
          Sucursal 3
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
