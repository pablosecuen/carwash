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

export const PaginationTable = ({
  total,
  totalPages,
  currentPage,
  prevPage,
  nextPage
}: {
  total: number
  totalPages: number
  currentPage: number
  prevPage: number | null
  nextPage: number | null
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageNumber = currentPage + 1

  const createHref = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }
  return (
    <div className='py-5'>
      <Pagination>
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            {
              currentPage > 0 && <PaginationPrevious href={createHref(currentPage - 1)} /> // ?? Si la pagina es mayor a 0 se muestra el boton de anterior
            }
          </PaginationItem>
          {/* Prev number */}
          <PaginationItem>
            {
              currentPage > 0 && (
                <PaginationLink href={createHref(currentPage - 1)}>
                  {pageNumber - 1 ?? 0}
                </PaginationLink>
              ) // ?? Si la pagina es mayor a 0 se muestra el numero de la pagina anterior
            }
          </PaginationItem>
          {/* Current */}
          <PaginationItem>
            <PaginationLink
              // href={
              //   `${pathname}?page=${currentPage}` // ?? Se muestra el numero de la pagina actual
              // }
              href={createHref(currentPage)}
              isActive
            >
              {
                pageNumber // ?? Se muestra el numero de la pagina actual
              }
            </PaginationLink>
          </PaginationItem>
          {/* Next number */}
          <PaginationItem>
            {
              nextPage != null && nextPage > 1 && (
                <PaginationLink
                  // href={
                  //   `${pathname}?page=${nextPage}` // ?? Si la pagina siguiente es mayor a 1 se muestra el numero de la pagina siguiente
                  // }
                  href={createHref(nextPage)}
                >
                  {pageNumber + 1}
                </PaginationLink>
              ) // ?? Si la pagina siguiente es mayor a 1 se muestra el numero de la pagina siguiente
            }
          </PaginationItem>
          {/* Next */}
          <PaginationItem>
            {
              totalPages > 4 && currentPage - 1 >= totalPages && <PaginationEllipsis /> // ?? Si el total de paginas es mayor a 10 se muestra el boton de siguiente
            }
          </PaginationItem>
          {/* Last */}
          <PaginationItem>
            {
              totalPages > 4 && currentPage === totalPages && (
                <PaginationLink
                  // href={`${pathname}?page=${totalPages}`}
                  href={createHref(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              ) // ?? Si el total de paginas es mayor a 10 se muestra el numero de la ultima pagina
            }
          </PaginationItem>
          {/* Next */}
          <PaginationItem>
            {
              currentPage < totalPages - 1 && (
                <PaginationNext
                  // href={`${pathname}?page=${currentPage + 1}`}
                  href={createHref(currentPage + 1)}
                />
              )
              // ?? Si la pagina es menor a la ultima pagina se muestra el boton de siguiente
            }
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className='flex-1 text-end text-sm text-muted-foreground'>
        <p>
          Pagina {pageNumber} de {totalPages + 1}
        </p>

        <p>
          Mostrando {total / (totalPages + 1)} de {total}
        </p>
      </div>
    </div>
  )
}
