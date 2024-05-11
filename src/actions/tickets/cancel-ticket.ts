'use server'

import { ticketRepository } from '@/db/repositories/ticket'
import { TicketStatus } from '@/utils/types'
import { revalidatePath } from 'next/cache'

export async function cancelTicket({ id }: { id: number | string }) {
  try {
    await ticketRepository.updateStatus({ id: Number(id), status: TicketStatus.CANCELLED })
    revalidatePath('/service')
    return {
      ok: true,
      message: 'El ticket se ha marcado como cancelado exitosamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo marcar el ticket como cancelado'
    }
  }
}
