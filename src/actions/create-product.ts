'use server'

import { productRepository } from '@/db/repositories/product'

export async function createProductAction(formData: FormData) {
  // TODO: validate
  const data = Object.fromEntries(formData) as {
    name: string
    description: string
    cashPrice: string
    cardPrice: string
  }
  try {
    const product = await productRepository.create({
      ...data,
      cashPrice: Number(data.cashPrice),
      cardPrice: Number(data.cardPrice)
    })
    console.log({ product })
  } catch (error) {
    console.error(error)
  }
}