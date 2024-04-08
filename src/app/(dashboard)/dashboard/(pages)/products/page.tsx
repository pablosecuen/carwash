import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { getAllProducts } from '@/utils/getters/products'
import { ProductsEmpty } from './ui/ProductsEmpty'

export default async function ProductsPage() {
  const products = await getAllProducts()
  console.log({ products })
  // Verificar si el array de productos está vacío
  if (products.length === 0) {
    return (
      <ContainerPage>
        <Title title='Productos' />
        <ProductsEmpty />
      </ContainerPage>
    )
  }
  return (
    <ContainerPage>
      <Title title='Productos' />
    </ContainerPage>
  )
}
