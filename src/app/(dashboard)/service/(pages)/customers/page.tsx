import { Suspense } from 'react'
import Link from 'next/link'
import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { EmptyPage } from '@/components/layout/page/EmptyPage'
import Search from '@/components/search/Search'
import { Button } from '@/components/ui/button'
import { getAllCustomers } from '@/actions/customer/getters'
import { PlusCircle } from 'lucide-react'
import { TableCustomers } from './ui/TableCustomers'

export default async function CustomersPage({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const customers = await getAllCustomers()

  const query = searchParams?.query ?? ''
  const currentPage = Number(searchParams?.page) ?? 1

  // Verificar si el array de customers está vacío
  if (customers.length === 0) {
    return (
      <ContainerPage>
        <Title title='Clientes' />
        <EmptyPage
          title='No tienes clientes'
          subtitle='Puedes agregar un nuevo cliente.'
          link='/service/customers/add-customer'
          button_text='Crear cliente'
        />
      </ContainerPage>
    )
  }

  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Clientes' />
        <Button size='sm' asChild>
          <Link href={'/service/customers/add-customer'} className='h-8 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Agregar cliente</span>
          </Link>
        </Button>
      </header>
      <Search placeholder='Buscar cliente' />

      <Suspense key={query + currentPage}>
        <TableCustomers />
      </Suspense>
    </ContainerPage>
  )
}
