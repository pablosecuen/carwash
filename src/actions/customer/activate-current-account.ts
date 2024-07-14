'use server'

import { customerRepository } from '@/db/repositories/customer'

export async function activateCurrentAccount({ id }: { id: number }) {
  try {
    await customerRepository.updateCurrentAccountById({
      id,
      currentAccount: true
    })
    return {
      ok: true,
      message: 'Cuenta corriente activada correctamente'
    }
  } catch (e) {
    console.error(e)
    return {
      ok: false,
      message: 'Error al activar la cuenta corriente'
    }
  }
}
