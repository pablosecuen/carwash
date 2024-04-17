'use server'

import { type Customer } from '@/db/entities'
import { customerRepository } from '@/db/repositories/customer'
import { extractCustomerIdFromSlug } from '@/utils/slug'

export const getCustomerBySlug = async (slug: string) => {
  try {
    const customerId = extractCustomerIdFromSlug(slug)
    const customer = await customerRepository.findById(customerId)
    return {
      customer: JSON.parse(JSON.stringify(customer)) as Customer
    }
  } catch (error) {
    return {
      customer: JSON.parse(JSON.stringify({})) as Customer
    }
  }
}
