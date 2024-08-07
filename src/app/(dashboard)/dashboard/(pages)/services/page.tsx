import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Button } from '@/components/ui/button'
import { getAllServices } from '@/actions/service/getters'
import { PlusCircle } from 'lucide-react'
import { ServiceTable } from './ui/service-table'
import Link from 'next/link'
import { Title } from '@/components/layout'
import { EmptyPage } from '@/components/layout/page/EmptyPage'

import { Separator } from '@/components/ui/separator'

export default async function Page() {
  const services = await getAllServices()

  // Verificar si el array de productos está vacío
  if (services.length === 0) {
    return (
      <ContainerPage>
        <Title title='Servicios' />
        <EmptyPage
          Icon={PlusCircle}
          title='No tienes servicios'
          subtitle='Puedes agregar un nuevo servicio.'
          link='/dashboard/services/new-service'
          button_text='Crear servicio'
        />
      </ContainerPage>
    )
  }

  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Servicios' />
        <div className='flex items-center gap-4'>
          <Button size='sm' asChild>
            <Link href={'/dashboard/services/new-service'} className='h-8 gap-1'>
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Crear servico</span>
            </Link>
          </Button>
        </div>
      </header>
      <Separator />

      <ServiceTable services={services} />
    </ContainerPage>
  )
}
