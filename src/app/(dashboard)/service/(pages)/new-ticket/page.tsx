import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'

export default function NamePage() {
  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Nuevo ticket' />
        {/* <Button size='sm' asChild>
          <Link href={'/dashboard/products/new-product'} className='h-8 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Crear producto</span>
          </Link>
        </Button> */}
      </header>

      {/* <AddCustomer /> */}
    </ContainerPage>
  )
}
