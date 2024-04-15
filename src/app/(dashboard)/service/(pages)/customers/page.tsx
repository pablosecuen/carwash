import { ServicesEmpty } from '@/app/(dashboard)/dashboard/(pages)/services/ui/ServicesEmpty'
import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { EmptyPage } from '@/components/layout/page/EmptyPage'
import { Button } from '@/components/ui/button'
import { getAllCustomers } from '@/utils/getters/customer'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function CustomersPage() {
  const customers = await getAllCustomers()

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
          <Link href={'/dashboard/products/new-product'} className='h-8 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Agregar cliente</span>
          </Link>
        </Button>
      </header>
    </ContainerPage>
  )
}
