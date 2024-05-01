'use server'

import { invoiceRepository } from '@/db/repositories/invoice'
import { hasPermission } from '@/utils/user-validate'

export async function setInvoiceCancelled({ invoiceId }: { invoiceId: number | string }) {
  try {
    const id = Number(invoiceId)
    // TODO: preguntar si el permiso es correcto
    if (await hasPermission('EDITOR')) return { ok: false, message: 'No tienes permisos' }
    await invoiceRepository.updateStatus({ id, status: 'canceled' })
    return {
      ok: true,
      message: 'Factura cancelada'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al completar la factura'
    }
  }
}
