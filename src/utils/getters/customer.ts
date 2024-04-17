import { customerRepository } from '@/db/repositories/customer'

// TODO: move to /actions/customer/getters.ts or /actions/customer/get-all.ts
// for move this method to a new file should change all imports to the new file
export async function getAllCustomers() {
  return await customerRepository.findAll()
}
