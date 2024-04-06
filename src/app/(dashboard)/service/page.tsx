import { Title } from '@/components/layout'
import { FormService } from './ui/FormService'
import { AddCustomer } from './ui/add-customer-dialog'
import { SummaryService } from './ui/summary-service'

export default function ServicePage() {
  return (
    <div className='mx-auto max-w-4xl px-10 py-5 '>
      <div className='flex flex-wrap items-center justify-between gap-y-2 border-b pb-2'>
        <Title title='Nuevo servicio' />

        <AddCustomer />
      </div>
      <div className='grid grid-cols-1 gap-5 pt-5 '>
        {/* formulario para agregar el servicio */}
        <FormService />

        {/* Resumen del servicio que se va agregando */}
        <SummaryService />
      </div>
    </div>
  )
}
