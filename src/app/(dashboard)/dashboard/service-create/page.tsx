import { createServiceAction } from '@/actions/create-service'
import { Title } from '@/components/layout'
import { VEHICLE_TYPES } from '@/utils/constants'

export default function Page() {
  return (
    <section className='mx-auto max-w-4xl px-10 py-5 '>
      <div className='flex flex-wrap items-center justify-between gap-y-2 border-b pb-2'>
        <Title title='Crear servicio' />
      </div>
      <form className='grid' action={createServiceAction}>
        <label htmlFor='name'>
          Nombre del servicio
          <input type='text' name='name' />
        </label>
        <label htmlFor='description'>
          Descripción del servicio
          <input type='text' name='description' />
        </label>
        <label htmlFor='cashPrice'>
          Precio en efectivo
          <input type='number' name='cashPrice' />
        </label>
        <label htmlFor='cardPrice'>
          Precio con tarjeta
          <input type='number' name='cardPrice' />
        </label>
        <fieldset>
          <legend>Disponible para</legend>
          {Object.entries(VEHICLE_TYPES).map(([key, value]) => (
            <label key={key} htmlFor={key}>
              <input type='radio' name={key} value={key} id={key} />
              {value}
            </label>
          ))}
        </fieldset>
        <button type='submit'>Crear servicio</button>
      </form>
    </section>
  )
}
