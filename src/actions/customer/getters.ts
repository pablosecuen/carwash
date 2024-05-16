import { type Customer } from '@/db/entities'
import { customerRepository } from '@/db/repositories/customer'
import { getBranch, hasPermission } from '@/utils/user-validate'

export async function getAllCustomers(name?: string) {
  try {
    const isAdmin = await hasPermission('ADMIN')
    const { customers } = await customerRepository.findAll({
      name,
      branch: isAdmin ? undefined : getBranch()
    })
    return {
      customers: JSON.parse(JSON.stringify(customers)) as typeof customers
    }
  } catch (error) {
    console.error(error)
    return {
      customers: []
    }
  }
}

// TODO: hanlder error properly
export async function getCustomersByName(name?: string) {
  return name != null
    ? ((await JSON.parse(JSON.stringify(await customerRepository.findByName(name)))) as Customer[])
    : ([] as Customer[])
}

export async function getCustomerById(id: number | string) {
  return JSON.parse(JSON.stringify(await customerRepository.findById(Number(id)))) as Customer
}
