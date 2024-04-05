import { createProductAction } from '@/actions/create-product'

export default function Page() {
  return (
    <section>
      <h1>Agregar un Producto</h1>
      <form className='grid' action={createProductAction}>
        <label htmlFor='name'>
          Nombre
          <input type='text' name='name' />
        </label>

        <label htmlFor='description'>
          Descripción
          <input name='description' />
        </label>
        <label htmlFor='cashPrice'>
          Precio en efectivo
          <input type='text' name='cashPrice' />
        </label>
        <label htmlFor='cardPrice'>
          Precio con tarjeta
          <input type='text' name='cardPrice' />
        </label>
        <button type='submit'>Add</button>
      </form>
    </section>
  )
}
