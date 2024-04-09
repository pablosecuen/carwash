'use server'
import { productRepository } from '@/db/repositories/product'

export async function removeProductAction(id: number) {
  try {
    await productRepository.delete(id)
    return {
      ok: true,
      message: 'Producto eliminado correctamente'
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Ocurrió un error al eliminar el producto'
    }
  }
}
