'use client'
import { createTicketAction } from '@/actions/tickets/create-ticket'
import { type Vehicle } from '@/db/entities'
import { type Service } from '@/db/entities/services'
import { useState } from 'react'

export function CreateTicketForm({
  vehicles = [],
  allServices
}: {
  vehicles: Vehicle[]
  allServices: Service[]
}) {
  const [services, setServices] = useState<Service[]>([])
  const onChangeVehicle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const vehicleId = Number(event.target.value)
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId)
    if (vehicle == null) return
    const services = allServices.filter((service) => service.avaliableFor.includes(vehicle.type))
    setServices(services)
  }
  return (
    <form action={createTicketAction} className='grid'>
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
        {/* 
        // TODO: Esto deberia un switch si esta en true es efectivo y false es tarjeta pero me da paja hacer el switch :D
        */}
        <select name='paymentMethod'>
          <option value='cash'>Efectivo</option>
          <option value='card'>Tarjeta de credito</option>
        </select>
      </label>
      <button>Crear ticket</button>
    </form>
  )
}
