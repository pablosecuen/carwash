'use server'
import { type Product } from '@/db/entities/product'
import { productRepository } from '@/db/repositories/product'

export async function getAllProducts() {
  try {
    const products = await productRepository.findAll()
    return JSON.parse(JSON.stringify(products)) as Product[]
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getProductById(id: number) {
  const product = await productRepository.findById(id)
  return JSON.parse(JSON.stringify(product)) as Product
}
