import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { FormProduct } from './ui/FormProduct'

export default function NewProductPage() {
  return (
    <ContainerPage>
      <Title title='Nuevo producto' />

      <FormProduct />
    </ContainerPage>
  )
}
