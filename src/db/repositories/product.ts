import { Product } from '../entities/product'
import { BaseRepository } from './base-repository'

export class ProductRepository extends BaseRepository<Product> {
  protected entity = Product

  async create(data: { name: string; cashPrice: number; cardPrice: number; description?: string }) {
    await this.init()
    const product = this.repository.create(data)
    await this.repository.save(product)
    return product
  }
}

export const productRepository = new ProductRepository()
