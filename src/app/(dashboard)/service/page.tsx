import { Title } from '@/components/layout'
import { FormService } from './ui/FormService'
import { AddCustomer } from './ui/add-customer-dialog'
import { SummaryService } from './ui/summary-service'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { SelectCustomer } from './SelectCustomer'
import { Suspense } from 'react'

export default function ServicePage() {
  return (
    <ContainerPage>
      <div className='flex flex-wrap items-center justify-between gap-y-2 border-b pb-2'>
        <Title title='Nuevo servicio' />

        <AddCustomer />
      </div>
      <div className='grid grid-cols-1 gap-5 pt-5 '>
        <Suspense fallback={<div className='h-10 w-full animate-pulse rounded-lg bg-muted'></div>}>
          <SelectCustomer />
        </Suspense>
        {/* formulario para agregar el servicio */}
        <FormService />

        {/* Resumen del servicio que se va agregando */}
        <SummaryService />
      </div>
    </ContainerPage>
  )
}
