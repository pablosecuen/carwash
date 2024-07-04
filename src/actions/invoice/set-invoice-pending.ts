'use server'
import { invoiceRepository } from '@/db/repositories/invoice'
import { ticketRepository } from '@/db/repositories/ticket'
import { TicketStatus } from '@/utils/types'
import { hasPermission } from '@/utils/user-validate'
import { revalidatePath } from 'next/cache'

export async function setInvoicePending({ invoiceId }: { invoiceId: number | string }) {
  try {
    const id = Number(invoiceId)
    // TODO: preguntar si el permiso es correcto
    const isPermission = await hasPermission('EDITOR')
    if (!isPermission) return { ok: false, message: 'No tienes permisos' }
    await invoiceRepository.updateStatus({ id, status: 'pending' })
    await ticketRepository.updateStatusByInvoiceId({
      invoiceId: id,
      status: TicketStatus.COMPLETED
    })
    revalidatePath('/dashboard/invoices')
    revalidatePath('/manager/invoices')
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
