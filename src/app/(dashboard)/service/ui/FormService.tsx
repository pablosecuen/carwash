import { Input } from '@/components/ui/input'
import { ServiceCheckbox } from './service-checkbox'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// TODO: use VECHICLE_TYPES to unify the types of vehicles in the app and
// in this types van type is missing
const TYPE_VEHICLE = [
  {
    value: 'car',
    label: 'Auto'
  },
  {
    value: 'motorcycle',
    label: 'Moto'
  },
  {
    value: 'truck',
    label: 'Camioneta'
  }
] as const

export const FormService = () => {
  return (
    <form action='' className='space-y-3'>
      <div>
        <label htmlFor='customer' className='text-xl font-semibold'>
          Cliente
        </label>
        <Input id='customer' name='customer' placeholder='Nombre del cliente' />
      </div>
      <div className='space-y-2'>
        <label htmlFor='vehicle' className='text-xl font-semibold'>
          Vehiculo
        </label>
        <Input id='vehicle' name='vehicle' placeholder='Nombre del vehiculo' />
        <div className='grid grid-cols-3 gap-1'>
          <Input id='vehicle' name='vehicle' placeholder='Marca del vehiculo' />
          <Input id='vehicle' name='vehicle' placeholder='Modelo' />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Selecciona el tipo' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TYPE_VEHICLE.map((type, i) => (
                  <SelectItem key={i} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <h3 className='text-xl font-semibold'>Servicios</h3>
      <div className='grid grid-cols-3 gap-1'>
        <div className='space-y-2'>
          <span className='text-sm opacity-90'>Lavado completo</span>
          <ServiceCheckbox id='complete-wash' label='Lavado completo' />
        </div>
        <div className='space-y-2'>
          <span className='text-sm opacity-90'>Lavado de motores</span>
          <ServiceCheckbox id='motor-wash' label='Lavado de motor' />
        </div>
        <div className='space-y-2'>
          <span className='text-sm opacity-90'>Limpieza de tapizados</span>
          <ServiceCheckbox id='motor-wash' label='Tapizados' />
          <ServiceCheckbox id='motor-wash' label='Tapizados + alfombras' />
          <ServiceCheckbox id='motor-wash' label='Tapizados + alfombras + techos' />
        </div>
      </div>
      <div className='flex w-full items-center justify-end'>
        <Button type='submit'>Cargar servicio</Button>
      </div>
    </form>
  )
}
