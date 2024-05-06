import { type Product } from '../entities/product'
import { productRepository } from '../repositories/product'

const PRODUCTS: Array<
  Omit<Product, 'id' | 'updatedAt' | 'description'> & { description?: string }
> = [
  {
    cardPrice: 3500,
    cashPrice: 3000,
    name: 'Revigal Caritas y Ruta 66',
    description: 'Revigal Caritas y Ruta 66 Perfume'
  },
  {
    cardPrice: 3500,
    cashPrice: 3000,
    name: 'Zafirus Perfumes Mini',
    description: 'Perfume Zafirus Mini'
  },
  {
    cardPrice: 3500,
    cashPrice: 3000,
    name: 'Pino Car Fresh',
    description: 'Perfume'
  },
  {
    cardPrice: 3500,
    cashPrice: 3000,
    name: 'Glade Lata Minigel',
    description: 'Perfume'
  },
  {
    cardPrice: 3500,
    cashPrice: 3000,
    name: 'Smell Fresh',
    description: 'Perfume'
  }
]

export const createProducts = async () => {
  await Promise.all(
    PRODUCTS.map(async (product) => {
      await productRepository.create({
        ...product
      })
    })
  )
}
