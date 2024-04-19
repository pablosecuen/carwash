import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { TicketForm } from './ui/TicketForm'

export default function NamePage() {
  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Nuevo ticket' />
      </header>

      <TicketForm />
    </ContainerPage>
  )
}
