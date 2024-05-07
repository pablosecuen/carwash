'use server'
import { invoiceRepository } from '@/db/repositories/invoice'
import { hasPermission } from '@/utils/user-validate'
import { revalidatePath } from 'next/cache'

export async function setInvoicePending({ invoiceId }: { invoiceId: number | string }) {
  try {
    const id = Number(invoiceId)
    // TODO: preguntar si el permiso es correcto
    const isPermission = await hasPermission('EDITOR')
    if (!isPermission) return { ok: false, message: 'No tienes permisos' }
    await invoiceRepository.updateStatus({ id, status: 'pending' })
    revalidatePath('/dashboard/invoices')
    return {
      ok: true,
      message: 'Factura pendiente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al completar la factura'
    }
  }
}
