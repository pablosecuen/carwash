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
        <label htmlFor='customer'>Cliente</label>
        <Input id='customer' name='customer' placeholder='Nombre del cliente' />
      </div>
      <div className='space-y-2'>
        <label htmlFor='vehicle'>Vehiculo</label>
        <Input id='vehicle' name='vehicle' placeholder='Nombre del vehiculo' />
        <Input id='vehicle' name='vehicle' placeholder='Marca del vehiculo' />
        <Input id='vehicle' name='vehicle' placeholder='Modelo' />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Selecciona el tipo' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TYPE_VEHICLE.map((type) => (
                <SelectItem value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
