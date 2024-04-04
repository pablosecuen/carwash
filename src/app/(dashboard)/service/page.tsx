import { Title } from '@/components/layout'
import { FormService } from './ui/FormService'
import { AddCustomer } from './ui/add-customer-dialog'
import { SummaryService } from './ui/summary-service'

export default function ServicePage() {
  return (
    <div className='py-5 max-w-7xl mx-auto px-10 '>
      <div className='flex items-center justify-between flex-wrap gap-y-2 border-b pb-2'>
        <Title title='Nuevo servicio' />

        <AddCustomer />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 pt-5 '>
        {/* formulario para agregar el servicio */}
        <FormService />

        {/* Resumen del servicio que se va agregando */}
        <SummaryService />
      </div>
    </div>
  )
}
