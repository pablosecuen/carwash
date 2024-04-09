'use server'
import { productRepository } from '@/db/repositories/product'

export async function updateProductAction(id: number | string, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    cashPrice: Number(formData.get('cashPrice')),
    cardPrice: Number(formData.get('cardPrice'))
  }

  try {
    const product = await productRepository.update(Number(id), data)
    return {
      ok: true,
      message: 'Producto actualizado'
    }
  } catch (error) {
    console.error({ error })
  }
}
