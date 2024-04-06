import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ServiceCheckbox } from './service-checkbox'
import { Button } from '@/components/ui/button'

export const SummaryService = () => {
  return (
    <Card>
      <CardHeader>
        <h3>Resumen del servicio</h3>
      </CardHeader>
      <CardContent>
        <div>
          <span>Fecha: </span> <span>12/12/2022</span>
        </div>
        <div>
          <span>Cliente: </span> <span>Imanol Dominguez</span>
        </div>
        <div>
          <span>Vehiculo: </span> <span>Ford Fiesta </span>
          <span>Servicio: </span> <span>Lavado completo</span>
        </div>
        <div>
          <span>Precio: </span> <span>$500</span>
        </div>
        <div>
          <span>Estado: </span> <span>Pendiente</span>
        </div>
        <div>
          <p>Metodo de pago:</p>
          <div className='mt-2 flex items-center gap-x-2'>
            <ServiceCheckbox id='efectivo' label='Efectivo' />
            <ServiceCheckbox id='tarjeta' label='Tarjeta' />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-center justify-end'>
          <Button>Generar ticket</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
