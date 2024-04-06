'use client'
import { createTicketAction } from '@/actions/create-ticket'
import { type Vehicle } from '@/db/entities'
import { type Service } from '@/db/entities/services'
import { type Ticket } from '@/db/entities/ticket'
import { useState } from 'react'

export function ServiceField({
  vehicles,
  allServices,
  addTicket
}: {
  vehicles: Vehicle[]
  allServices: Service[]
  addTicket: (ticket: Ticket) => void
}) {
  const [services, setServices] = useState<Service[]>([])
  const handlerSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    createTicketAction(formData)
      .then(async (ticket) => {
        if (ticket == null) {
          console.error('Ticket is null')
          return
        }
        addTicket(ticket)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const onChangeVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleId = Number(event.target.value)
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId)
    if (vehicle == null) return
    const services = allServices.filter((service) => service.avaliableFor.includes(vehicle.type))
    setServices(services)
  }
  return (
    <form onSubmit={handlerSumbit}>
      <label htmlFor='vehicle'>
        Vehiculo
        <select name='vehicle' onChange={onChangeVehicle}>
          <option></option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.brand} {vehicle.model} ({vehicle.patent})
            </option>
          ))}
        </select>
      </label>
      <label htmlFor='service'>
        Servicio
        <select name='service'>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor='paymentMethod'>
        Metodo de pago
        <select name='paymentMethod'>
          <option value='cash'>Efectivo</option>
          <option value='card'>Tarjeta de credito</option>
        </select>
      </label>
      <button>añadir ticket</button>
    </form>
  )
}
