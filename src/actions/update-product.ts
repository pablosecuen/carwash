import { productRepository } from '@/db/repositories/product'

export function updateProductAction(id: number | string) {
  return async function (formData: FormData) {
    'use server'
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      cashPrice: Number(formData.get('cashPrice')),
      cardPrice: Number(formData.get('cardPrice'))
    }

    try {
      const product = await productRepository.update(Number(id), data)
      console.log({ product })
    } catch (error) {
      console.error(error)
    }
  }
}
