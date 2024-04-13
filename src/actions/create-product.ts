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
    await productRepository.create({
      ...data,
      cashPrice: Number(data.cashPrice),
      cardPrice: Number(data.cardPrice)
    })
    return {
      ok: true,
      message: 'Producto creado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear el producto'
    }
  }
}
