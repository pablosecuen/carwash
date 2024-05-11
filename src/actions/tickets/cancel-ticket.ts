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
      message: 'Ticket cancelled successfully'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Failed to cancel ticket'
    }
  }
}
