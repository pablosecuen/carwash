'use server'

import { ticketRepository } from '@/db/repositories/ticket'
import { TicketStatus } from '@/utils/types'

export async function completeTicket({ id }: { id: number | string }) {
  try {
    await ticketRepository.updateStatus({ id: Number(id), status: TicketStatus.COMPLETED })
    return {
      ok: true,
      message: 'Ticket completed successfully'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Failed to complete ticket'
    }
  }
}
