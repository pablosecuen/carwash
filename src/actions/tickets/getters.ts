import { type Ticket } from '@/db/entities/ticket'
import { ticketRepository } from '@/db/repositories/ticket'
import { getUserBranch, hasPermission } from '@/utils/user-validate'

export async function getTicketsByVehicleId(
  vehicleId: string,
  options: { from?: Date; to?: Date } = {}
) {
  const tickets = await ticketRepository.findByVehicleId(vehicleId, options)
  return JSON.parse(JSON.stringify(tickets)) as Ticket[]
}

export async function getAllDailyTickets({ page = 0 }: { page?: number } = {}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const isAdmin = await hasPermission('ADMIN')
  const branch = isAdmin ? undefined : await getUserBranch()
  const tickets = await ticketRepository.findAll({
    limit: 20,
    offset: page * 20,
    from: today,
    to: tomorrow,
    branch,
    joins: {
      vehicle: true,
      invoice: true
    }
  })
  return JSON.parse(JSON.stringify(tickets)) as typeof tickets
}
