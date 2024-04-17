import { getProductById } from '@/actions/product/getters'
import { ProductEditForm } from './ui/ProductEditForm'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Title } from '@/components/layout/title/title'

interface Props {
  params: {
    productId: number
  }
}

export default async function ProductPage({ params: { productId } }: Props) {
  const product = await getProductById(productId)

  return (
    <ContainerPage>
      <Title title={`Actualizar producto ${product.name}`} />

      <ProductEditForm product={product} />
    </ContainerPage>
  )
}
