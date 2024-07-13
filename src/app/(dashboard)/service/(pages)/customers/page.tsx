import { Suspense } from 'react'
import Link from 'next/link'
import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'

import Search from '@/components/search/Search'
import { Button } from '@/components/ui/button'

import { PlusCircle } from 'lucide-react'
import { TableCustomers } from './ui/TableCustomers'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { hasPermission } from '@/utils/user-validate'
import { ExportToExcelBtn } from './ui/export-to-excel-btn'
import { OnlyCurrentAccountCustomers } from './ui/only-current-account-customers'

export default async function CustomersPage({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
    sortBy?: string
    withCurrentAccount?: boolean
    sortDirection?: 'ASC' | 'DESC'
  }
}) {
  const currentPage = Number(searchParams?.page) ?? 1
  const query = searchParams?.query ?? ''

  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Clientes' />
        <div className='flex gap-2'>
          {(await hasPermission('ADMIN')) && (
            <>
              <OnlyCurrentAccountCustomers />
              <ExportToExcelBtn />
            </>
          )}
          <Button size='sm' asChild>
            <Link href={'/service/customers/add-customer'} className='h-8 gap-1'>
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Agregar cliente</span>
            </Link>
          </Button>
        </div>
      </header>
      <Search placeholder='Busca un cliente por nombre' />

      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <TableCustomers
          name={query}
          withCurrentAccount={searchParams?.withCurrentAccount}
          sort={{
            sortBy: searchParams?.sortBy,
            orderDir: searchParams?.sortDirection
          }}
        />
      </Suspense>
    </ContainerPage>
  )
}
