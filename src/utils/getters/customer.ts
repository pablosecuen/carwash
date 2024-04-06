import { customerRepository } from '@/db/repositories/customer'

// TODO: hanlder error properly
export async function getCustomerByName(name?: string) {
  return name != null ? await customerRepository.findByName(name) : []
}
