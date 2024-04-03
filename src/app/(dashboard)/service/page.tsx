import { Title } from '@/components/layout'
import { FormService } from './ui/FormService'
import { AddCustomer } from './ui/add-customer'

export default function ServicePage() {
  return (
    <div className='py-5 max-w-7xl mx-auto'>
      <div className='flex items-center justify-between'>
        <Title title='Nuevo servicio' />

        <AddCustomer />
      </div>
      <div className='flex flex-col lg:flex-row'>
        {/* formulario para agregar el servicio */}
        <div>
          <FormService />
        </div>
        {/* Resumen del servicio que se va agregando */}
        <div></div>
      </div>
    </div>
  )
}
