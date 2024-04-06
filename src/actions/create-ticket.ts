'use server'

import { type Ticket } from '@/db/entities/ticket'
import { serviceRepository } from '@/db/repositories/service'
import { ticketRepository } from '@/db/repositories/ticket'
import { vehicleRepository } from '@/db/repositories/vehicle'
import { type PaymentMethod } from '@/utils/types'

export async function createTicketAction(formData: FormData) {
  const data = {
    vehicleId: formData.get('vehicle') as string,
    serviceId: formData.get('service') as string,
    paymentMethod: formData.get('paymentMethod') as PaymentMethod
  }
  try {
    const service = await serviceRepository.findById(Number(data.serviceId))
    const vehicle = await vehicleRepository.findById(Number(data.vehicleId))
    const ticket = await ticketRepository.create({
      service,
      vehicle,
      paymentMethod: data.paymentMethod
    })
    return JSON.parse(JSON.stringify(ticket)) as Ticket
  } catch (error) {
    console.error(error)
  }
}
