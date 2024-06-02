'use client'

import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SortButton({ sortBy }: { sortBy: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const handlerClick = () => {
    const sParams = new URLSearchParams(searchParams)
    const order = sParams.get('sortBy')
    const sortDirection = sParams.get('sortDirection')
    if (order === sortBy) {
      sParams.set('sortDirection', sortDirection === 'ASC' ? 'DESC' : 'ASC')
    } else {
      sParams.set('sortBy', sortBy)
      sParams.set('sortDirection', 'ASC')
    }
    router.replace(`${pathname}?${sParams.toString()}`)
  }
  return (
    <Button variant={'ghost'} size={'sm'} onClick={handlerClick}>
      <ArrowUpDown size={16} />
    </Button>
  )
}
