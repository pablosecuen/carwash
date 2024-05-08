import { Branch, VehicleType } from '@/utils/types'
import { type Vehicle } from '../entities'
import { customerRepository } from '../repositories/customer'
import { vehicleRepository } from '../repositories/vehicle'

const VEHICLES: Array<Omit<Vehicle, 'id' | 'customer'>> = [
  {
    brand: 'Ford',
    model: 'Focus',
    patent: 'ABC123',
    type: VehicleType.SEDAN,
    year: 2019
  },
  {
    brand: 'toyota',
    model: 'hilux',
    patent: 'DEF456',
    type: VehicleType.TRUCK,
    year: 2020
  },
  {
    brand: 'Peugeot',
    model: 'Partner',
    patent: 'GHI789',
    type: VehicleType.VAN,
    year: 2021
  },
  {
    brand: 'Honda',
    model: 'Tornado',
    patent: 'JKL012',
    type: VehicleType.MOTORCYCLE,
    year: 2022
  }
]

const CUSTOMERS: Array<Record<'name' | 'email' | 'phone' | 'address', string>> = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St'
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm St'
  },
  {
    name: 'Michael Johnson',
    email: 'michaeljohnson@example.com',
    phone: '555-123-4567',
    address: '789 Oak St'
  },
  {
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    phone: '444-555-6666',
    address: '321 Maple Ave'
  },
  {
    name: 'Robert Wilson',
    email: 'robertwilson@example.com',
    phone: '777-888-9999',
    address: '654 Pine Rd'
  },
  {
    name: 'Sarah Brown',
    email: 'sarahbrown@example.com',
    phone: '222-333-4444',
    address: '987 Cedar Ln'
  },
  {
    name: 'David Taylor',
    email: 'davidtaylor@example.com',
    phone: '111-222-3333',
    address: '654 Birch Dr'
  },
  {
    name: 'Jennifer Anderson',
    email: 'jenniferanderson@example.com',
    phone: '333-444-5555',
    address: '321 Oak Ave'
  },
  {
    name: 'Christopher Martinez',
    email: 'christophermartinez@example.com',
    phone: '999-888-7777',
    address: '789 Maple St'
  },
  {
    name: 'Amanda Hernandez',
    email: 'amandahernandez@example.com',
    phone: '777-666-5555',
    address: '456 Elm St'
  },
  {
    name: 'Daniel Thompson',
    email: 'danielthompson@example.com',
    phone: '555-444-3333',
    address: '123 Pine Rd'
  },
  {
    name: 'Jhon Rambo',
    email: 'jhonrambo@example.com',
    phone: '303-234-7950',
    address: '123 Main St'
  }
]

export const createCustomers = async () => {
  return await Promise.all(
    CUSTOMERS.map(async (customer, i) => {
      let branch = Branch.ONE
      if (i > 4) branch = Branch.TWO
      if (i > 8) branch = Branch.THREE

      const customerEntity = await customerRepository.create({
        ...customer,
        branch
      })

      // Create vehicles for customer
      const vehicles = await Promise.all(
        VEHICLES.map(async (vehicle) => {
          return await vehicleRepository.create({
            ...vehicle,
            customerId: customerEntity.id
          })
        })
      )

      // Add vehicles to customer
      // Don't parallelize this loop, because we need to add vehicles in order and
      // a promise.all don't add correctly the vehicles and deletes some relations
      for (const vehicle of vehicles) {
        if (vehicle == null) throw new Error('vehicle is null')
        await customerRepository.addVehicle(customerEntity.id, vehicle)
      }

      return customerEntity
    })
  )
}
