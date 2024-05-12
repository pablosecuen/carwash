'use server'

import { invoiceRepository } from '@/db/repositories/invoice'
import { hasPermission } from '@/utils/user-validate'
import { revalidatePath } from 'next/cache'

export async function setInvoiceCompleted({ invoiceId }: { invoiceId: number | string }) {
  try {
    const id = Number(invoiceId)
    const isPermission = await hasPermission('EDITOR')
    if (!isPermission) return { ok: false, message: 'No tienes permisos' }
    await invoiceRepository.updateStatus({ id, status: 'completed' })
    revalidatePath('/dashboard/invoices')
    revalidatePath('/manager/invoices')
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
