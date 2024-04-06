import { type Product } from '@/db/entities/product'
import { PaymentMethod } from '@/utils/types'

export function ProductsField({
  products,
  addProduct
}: {
  products: Product[]
  addProduct: (product: Product & { paymentMethod: PaymentMethod }) => void
}) {
  return (
    <ul>
      <h1>productos</h1>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} -
          <button
            onClick={() => {
              addProduct({ ...product, paymentMethod: PaymentMethod.CARD })
            }}
          >
            card ${product.cardPrice}
          </button>
          <button
            onClick={() => {
              addProduct({ ...product, paymentMethod: PaymentMethod.CASH })
            }}
          >
            cash ${product.cashPrice}
          </button>
        </li>
      ))}
    </ul>
  )
}
