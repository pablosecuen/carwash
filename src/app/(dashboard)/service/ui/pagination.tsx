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
import { usePathname } from 'next/navigation'

export const PaginationTable = ({
  total,
  currentPage,
  totalPage,
  prevPage,
  nextPage
}: {
  total: number
  currentPage: number
  totalPage: number
  prevPage: number | null
  nextPage: number | null
}) => {
  const pathname = usePathname()
  const params = new URLSearchParams(pathname)

  params.set('page', currentPage.toString())

  const pageNumberPrev = currentPage - 1 === 0 ? 1 : currentPage - 1
  const pageNumberNext = currentPage + 1

  // ?? Al page de la url no se le suma 1 porque el backend empieza desde 0
  // ?? y el frontend desde 1

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`${pathname}?page=${pageNumberPrev}`} />
        </PaginationItem>
        <PaginationItem>
          {currentPage !== 0 && <PaginationLink href={''}>{pageNumberPrev + 1}</PaginationLink>}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={''} isActive>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={''}>{pageNumberNext + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`${pathname}?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
