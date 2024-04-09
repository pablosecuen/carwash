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

  async findAll() {
    await this.init()
    return await this.repository.find()
  }

  async findById(id: number) {
    await this.init()
    const product = await this.repository.findOne({ where: { id } })
    if (product == null) {
      throw new Error('Product not found')
    }

    return product
  }

  async update(id: number, data: Partial<Product>) {
    await this.init()
    await this.repository.update(id, data)
    return await this.findById(id)
  }

  async delete(id: number) {
    await this.init()
    const product = await this.findById(id)
    await this.repository.remove(product)
  }
}

export const productRepository = new ProductRepository()
