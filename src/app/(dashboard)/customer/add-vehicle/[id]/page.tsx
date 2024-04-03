import { customerAddVehicle } from '@/actions/customer-add-vehicle'
import { customerRepository } from '@/db/repositories/customer'
import { VEHICLE_TYPES } from '@/utils/constants'

interface PageProps {
  params: {
    id: string
  }
}
export default async function Page(props: PageProps) {
  // TODO: validate id
  const { id } = props.params
  // TODO: move this to a hook or a helper
  const customer = await customerRepository.findById(Number(id))

  return (
    <main>
      <h1>Agregar vehiculo a {customer.name}</h1>
      <form action={await customerAddVehicle(Number(id))}>
        <label htmlFor='type'>
          Tipo
          <select name='type' id='type'>
            {Object.entries(VEHICLE_TYPES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='brand'>
          Marca
          <input type='text' name='brand' />
        </label>

        <label htmlFor='model'>
          Modelo
          <input type='text' name='model' />
        </label>
        <label htmlFor='year'>
          Año
          {/* 
            // TODO: add min and max values
          */}
          <input type='number' name='year' />
        </label>
        <label htmlFor='patent'>
          Patente
          <input type='text' name='patent' />
        </label>
        <button type='submit'>Agregar</button>
      </form>
    </main>
  )
}