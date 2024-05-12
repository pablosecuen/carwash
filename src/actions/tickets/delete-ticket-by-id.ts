'use server'

import { ticketRepository } from '@/db/repositories/ticket'

export const deleteTicketById = async (id: string) => {
  try {
    await ticketRepository.deleteById(Number(id))
    return { ok: true, message: 'Ticket eliminado' }
  } catch (error) {
    return { ok: false, message: 'Ticket no eliminado' }
  }
}
