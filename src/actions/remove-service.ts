'use server'

import { serviceRepository } from '@/db/repositories/service'

export async function removeServiceAction(id: number) {
  try {
    await serviceRepository.delete(id)
    return {
      ok: true,
      message: 'Service eliminado correctamente'
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'Ocurrió un error al eliminar el servicio'
    }
  }
}
