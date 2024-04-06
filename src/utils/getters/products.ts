import { productRepository } from '@/db/repositories/product'

export async function getAllProducts() {
  return await productRepository.findAll()
}
