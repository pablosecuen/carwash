import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { AddClientForm } from './ui/AddClientForm'

export default function AddCustomerPage(props: { searchParams: { customerName?: string } }) {
  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Nuevo cliente' />
      </header>

      <AddClientForm customerName={props?.searchParams?.customerName} />
    </ContainerPage>
  )
}
