import { customerRepository } from '@/db/repositories/customer'

export async function getAllCustomers() {
  return await customerRepository.findAll()
}

// TODO: hanlder error properly
export async function getCustomerByName(name?: string) {
  return name != null ? await customerRepository.findBySlug(name) : {}
}
