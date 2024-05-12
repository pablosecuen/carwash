'use server'

import { ticketRepository } from '@/db/repositories/ticket'
import { TicketStatus } from '@/utils/types'
import { revalidatePath } from 'next/cache'

export async function setPendingTicket({ id }: { id: number | string }) {
  try {
    await ticketRepository.updateStatus({ id: Number(id), status: TicketStatus.PENDING })
    revalidatePath('/service')
    return {
      ok: true,
      message: 'El ticket se ha marcado como pendiente exitosamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo marcar el ticket como pendiente'
    }
  }
}
