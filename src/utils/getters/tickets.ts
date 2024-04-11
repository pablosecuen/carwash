import { ticketRepository } from '@/db/repositories/ticket'

export async function getTicketsByVehicleId(
  vehicleId: string,
  options: { from?: Date; to?: Date } = {}
) {
  return await ticketRepository.findByVehicleId(vehicleId, options)
}
