'use server'

import { invoiceRepository } from '@/db/repositories/invoice'
import { hasPermission } from '@/utils/user-validate'

export async function setInvoiceCompleted({ invoiceId }: { invoiceId: number | string }) {
  try {
    const id = Number(invoiceId)
    if (await hasPermission('EDITOR')) return { ok: false, message: 'No tienes permisos' }
    await invoiceRepository.updateStatus({ id, status: 'completed' })
    return {
      ok: true,
      message: 'Factura completada'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al completar la factura'
    }
  }
}
