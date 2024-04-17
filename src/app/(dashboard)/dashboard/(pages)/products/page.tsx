import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { getAllProducts } from '@/actions/product/getters'
import { ProductsEmpty } from './ui/ProductsEmpty'
import { ProductsTable } from './ui/ProductsTable'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function ProductsPage() {
  const products = await getAllProducts()

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
      <header className='flex items-center justify-between fade-in'>
        <Title title='Productos' />
        <Button size='sm' asChild>
          <Link href={'/dashboard/products/new-product'} className='h-8 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Crear producto</span>
          </Link>
        </Button>
      </header>

      <ProductsTable products={products} />
    </ContainerPage>
  )
}
