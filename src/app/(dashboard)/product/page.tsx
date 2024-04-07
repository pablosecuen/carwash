import { getAllProducts } from '@/utils/getters/products'
import Link from 'next/link'

export default async function Page() {
  const products = await getAllProducts()
  return (
    <section>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Cash price</th>
            <th>Card price</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.cashPrice}</td>
              <td>{product.cardPrice}</td>
              <td>
                <Link href={`product/update/${product.id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
