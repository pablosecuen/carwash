import { ContainerPage } from '@/components/layout/page/ContainerPage'
// import { getAllProducts } from '@/utils/getters/products'
import { TableOrders } from './ui/table/TableOrders'
import { DashboardCard } from './ui/cards/DashboardCard'

export default async function DashboardPage() {
  // const products = await getAllProducts()
  return (
    <ContainerPage>
      <div className='grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        {/* left */}
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
          {/* Cards */}
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            <DashboardCard
              className='fade-in sm:col-span-2 '
              title='Servicios'
              description='Esta sección te permite administrar los servicios que se ofrecen en el sistema.'
              href='/dashboard/services'
              linkLabel='Ir a servicios'
            />
            <DashboardCard
              className='fade-in sm:col-span-2 '
              title='Productos'
              description='Esta sección te permite administrar los productos que se ofrecen en el sistema.'
              href='/dashboard/products'
              linkLabel='Ir a productos'
            />
          </div>

          {/* Table Orders */}
          <TableOrders />
        </div>
        {/* TODO: Ver que renderizar en esta seccion */}
        {/* rigth */}
        <div>
          {/* {products.length === 0 ? <ProductsEmpty /> : <ProductsTable products={products} />} */}
        </div>
      </div>
    </ContainerPage>
  )
}
