'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext
} from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'

export const PaginationTable = () => {
  const params = useSearchParams()
  const page = +(params.get('page') ?? 1)
  const pathname = usePathname()

  const pageNumberPrev = page - 1 === 0 ? 1 : page - 1
  const pageNumberNext = page + 1
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`${pathname}?page=${pageNumberPrev}`} />
        </PaginationItem>
        <PaginationItem>
          {page !== 1 && <PaginationLink href={''}>{pageNumberPrev}</PaginationLink>}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={''} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={''}>{pageNumberNext}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`${pathname}?page=${page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
