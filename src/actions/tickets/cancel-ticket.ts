'use server'

import { ticketRepository } from '@/db/repositories/ticket'
import { TicketStatus } from '@/utils/types'

export async function cancelTicket({ id }: { id: number | string }) {
  try {
    await ticketRepository.updateStatus({ id: Number(id), status: TicketStatus.CANCELLED })
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
