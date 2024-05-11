'use server'

import { ticketRepository } from '@/db/repositories/ticket'
import { TicketStatus } from '@/utils/types'

export async function setPendingTicket({ id }: { id: number | string }) {
  try {
    await ticketRepository.updateStatus({ id: Number(id), status: TicketStatus.PENDING })
    return {
      ok: true,
      message: 'Ticket is now pending'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Failed to set ticket as pending'
    }
  }
}
