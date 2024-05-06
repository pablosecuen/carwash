'use server'

import { serviceRepository } from '@/db/repositories/service'
import { revalidatePath } from 'next/cache'

export async function removeServiceAction(id: number) {
  try {
    await serviceRepository.delete(id)
    revalidatePath('dashboard/services')
    return {
      ok: true,
      message: 'Servicio eliminado correctamente'
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Ocurrió un error al eliminar el servicio'
    }
  }
}
