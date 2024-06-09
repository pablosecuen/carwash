import { type Ticket } from '@/db/entities/ticket'
import { ticketRepository } from '@/db/repositories/ticket'
import { getFromAndToOfADay } from '@/utils/formatters'
import { TicketStatus } from '@/utils/types'
import { getUserBranch, hasPermission } from '@/utils/user-validate'

export async function getTicketsByVehicleId(
  vehicleId: string,
  options: { from?: Date; to?: Date } = {}
) {
  const tickets = await ticketRepository.findByVehicleId(vehicleId, options)
  return JSON.parse(JSON.stringify(tickets)) as Ticket[]
}

export async function getAllDailyTickets({
  page = 0,
  sort
}: {
  page?: number
  sort?: {
    sortBy?: string
    orderDir?: 'ASC' | 'DESC'
  }
} = {}) {
  const { from, to } = getFromAndToOfADay()
  const isAdmin = await hasPermission('ADMIN')
  const branch = isAdmin ? undefined : await getUserBranch()
  const tickets = await ticketRepository.findAll({
    limit: 20,
    offset: page * 20,
    from,
    to,
    branch,
    sort,
    joins: {
      vehicle: true,
      service: true,
      invoice: true
    }
  })
  return JSON.parse(JSON.stringify(tickets)) as typeof tickets
}

export async function getPendingTickets({
  page = 0,
  sort
}: {
  page?: number
  sort?: {
    sortBy?: string
    orderDir?: 'ASC' | 'DESC'
  }
}) {
  const isAdmin = await hasPermission('ADMIN')
  const branch = isAdmin ? undefined : await getUserBranch()
  const tickets = await ticketRepository.findAll({
    status: TicketStatus.PENDING,
    branch,
    sort,
    limit: 20,
    offset: page * 20,
    joins: {
      vehicle: true,
      invoice: true,
      service: true
    }
  })
  return JSON.parse(JSON.stringify(tickets)) as typeof tickets
}
