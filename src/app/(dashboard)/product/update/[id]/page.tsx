import { updateProductAction } from '@/actions/update-product'
import { getProductById } from '@/utils/getters/products'

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id))

  return (
    <section>
      <h1>Actualizar Producto</h1>
      <form action={updateProductAction(params.id)} className='grid'>
        <label>
          Nombre:
          <input type='text' name='name' defaultValue={product.name} />
        </label>
        <label>
          Descripción:
          <input type='text' name='description' defaultValue={product.description ?? ''} />
        </label>
        <label>
          Precio en efectivo:
          <input type='number' name='cashPrice' defaultValue={product.cashPrice} />
        </label>
        <label>
          Precio con tarjeta:
          <input type='number' name='cardPrice' defaultValue={product.cardPrice} />
        </label>
        <button type='submit'>Actualizar</button>
      </form>
    </section>
  )
}
