import { type Ticket } from '@/db/entities/ticket'
import { ticketRepository } from '@/db/repositories/ticket'

export async function getTicketsByVehicleId(
  vehicleId: string,
  options: { from?: Date; to?: Date } = {}
) {
  const tickets = await ticketRepository.findByVehicleId(vehicleId, options)
  return JSON.parse(JSON.stringify(tickets)) as Ticket[]
}
