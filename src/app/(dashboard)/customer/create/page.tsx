/* eslint-disable @typescript-eslint/no-misused-promises */
import { createCustomerAction } from '@/actions/create-customer'

export default function Page() {
  return (
    <main>
      <h1>Añadir nuevo cliente</h1>
      <form action={createCustomerAction} className='text-black'>
        <label htmlFor='name'>
          <input type='text' name='name' placeholder='Nombre' />
        </label>
        <label htmlFor='email'>
          <input type='email' name='email' placeholder='Email' />
        </label>
        <label htmlFor='phone'>
          <input type='tel' name='phone' placeholder='telefono' />
        </label>
        <button type='submit' className='text-white'>
          Añadir cliente
        </button>
      </form>
    </main>
  )
}
