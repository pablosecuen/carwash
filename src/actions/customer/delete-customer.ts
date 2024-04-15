'use server'

import { customerRepository } from '@/db/repositories/customer'

export const deleteCustomer = async (id: number) => {
  try {
    await customerRepository.deleteById(id)
    console.log('customer deleted')
  } catch (error) {
    console.log(error)
  }
}
