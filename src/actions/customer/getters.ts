import { type Customer } from '@/db/entities'
import { customerRepository } from '@/db/repositories/customer'

export async function getAllCustomers() {
  return await customerRepository.findAll()
}

// TODO: hanlder error properly
export async function getCustomersByName(name?: string) {
  return name != null
    ? (JSON.parse(JSON.stringify(await customerRepository.findByName(name))) as Customer[])
    : ([] as Customer[])
}
