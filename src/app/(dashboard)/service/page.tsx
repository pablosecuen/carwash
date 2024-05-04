import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { DashboardCard } from '../../../components/DashboardCard'
import { TableCustomers } from './ui/server/TableCustomers'
import { DashboardCardProducts } from '@/components/DashboardCardProducts'

export default async function ServicePage() {
  return (
    <ContainerPage>
      <div className='grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        {/* left */}
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3'>
          {/* Cards */}
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6'>
            <DashboardCard
              className=' sm:col-span-2 '
              title='Tickets'
              description='Esta sección te permite crear tickets para registrar en el sistema.'
              href='/service/new-ticket'
              linkLabel='Crear ticket'
            />
            <DashboardCard
              className=' sm:col-span-2 '
              title='Clientes'
              description='Esta sección te permite administrar los clientes del sistema.'
              href='/service/customers'
              linkLabel='Ver clientes'
            />

            <DashboardCardProducts
              className=' sm:col-span-2 '
              title='Productos'
              description='Aqui podras ver todos los productos que hay en el sistema.'
            />
          </div>

          <TableCustomers />
        </div>

        {/* Ver que otros datos darle al empleado como forma de informacion, estadisticas */}
      </div>
    </ContainerPage>
  )
}
