import { Title } from '@/components/layout'
import { FormService } from './ui/FormService'
import { Breadcrumbs } from '@/components/layout/breadcrumb/Breadcrumb'
import { ContainerPage } from '@/components/layout/page/ContainerPage'

export default function Page() {
  return (
    <ContainerPage>
      <div className='flex flex-wrap items-center justify-between gap-y-2 border-b pb-2'>
        <Title title='Crear servicio' />
      </div>

      <FormService />
    </ContainerPage>
  )
}
