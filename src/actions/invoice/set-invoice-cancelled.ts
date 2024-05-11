'use server'

import { invoiceRepository } from '@/db/repositories/invoice'
import { hasPermission } from '@/utils/user-validate'
import { revalidatePath } from 'next/cache'

export async function setInvoiceCancelled({ invoiceId }: { invoiceId: number | string }) {
  try {
    const id = Number(invoiceId)
    // TODO: preguntar si el permiso es correcto
    const isPermission = await hasPermission('EDITOR')
    if (!isPermission) return { ok: false, message: 'No tienes permisos' }
    await invoiceRepository.updateStatus({ id, status: 'cancelled' })
    revalidatePath('/dashboard/invoices')
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
