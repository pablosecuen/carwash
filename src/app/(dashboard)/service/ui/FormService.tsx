import { Input } from '@/components/ui/input'
import { ServiceCheckbox } from './service-checkbox'
import { Button } from '@/components/ui/button'

export const FormService = () => {
  return (
    <form action='' className='space-y-3'>
      <div>
        <label htmlFor='customer'>Cliente</label>
        <Input id='customer' name='customer' placeholder='Nombre del cliente' />
      </div>
      <div>
        <label htmlFor='customer'>Vehiculo</label>
        <Input id='customer' name='customer' placeholder='Nombre del vehiculo' />
      </div>
      <div>
        <span>Lavado completo</span>
        <ServiceCheckbox id='complete-wash' label='Lavado completo' />
      </div>
      <div>
        <span>Lavado de motores</span>
        <ServiceCheckbox id='motor-wash' label='Lavado de motor' />
      </div>
      <div>
        <span>Limpieza de tapizados</span>
        <ServiceCheckbox id='motor-wash' label='Tapizados' />
        <ServiceCheckbox id='motor-wash' label='Tapizados + alfombras' />
        <ServiceCheckbox id='motor-wash' label='Tapizados + alfombras + techos' />
      </div>

      <Button type='submit' variant='outline'>
        Cargar servicio
      </Button>
    </form>
  )
}
