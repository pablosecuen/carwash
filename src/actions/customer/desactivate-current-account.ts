'use server'

import { customerRepository } from '@/db/repositories/customer'

export async function desactivateCurrentAccount({ id }: { id: number }) {
  try {
    await customerRepository.updateCurrentAccountById({
      id,
      currentAccount: false
    })
    return {
      ok: true,
      message: 'Cuenta corriente desactivada correctamente'
    }
  } catch (e) {
    console.error(e)
    return {
      ok: false,
      message: 'Error al desactivar la cuenta corriente'
    }
  }
}
