'use server'

import { Customer } from '@/db/entities'
import { customerRepository } from '@/db/repositories/customer'

export const getCustomerBySlug = async (slug: string) => {
  try {
    const customer = await customerRepository.findBySlug(slug)

    return {
      customer: JSON.parse(JSON.stringify(customer)) as Customer
    }
  } catch (error) {
    return {
      customer: JSON.parse(JSON.stringify({})) as Customer
    }
  }
}
