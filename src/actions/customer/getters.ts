import { type Customer } from '@/db/entities'
import { customerRepository } from '@/db/repositories/customer'

export async function getAllCustomers() {
  return JSON.parse(JSON.stringify(await customerRepository.findAll())) as Customer[]
}

// TODO: hanlder error properly
export async function getCustomersByName(name?: string) {
  return name != null
    ? ((await JSON.parse(JSON.stringify(await customerRepository.findByName(name)))) as Customer[])
    : ([] as Customer[])
}
