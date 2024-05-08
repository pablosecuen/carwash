import { type Customer } from '@/db/entities'
import { customerRepository } from '@/db/repositories/customer'
import { getBranch, hasPermission } from '@/utils/user-validate'

export async function getAllCustomers(name?: string) {
  try {
    const isAdmin = await hasPermission('ADMIN')
    return JSON.parse(
      JSON.stringify(
        await customerRepository.findAll({
          // filter by branch if user is not admin
          name,
          branch: isAdmin ? undefined : getBranch()
        })
      )
    ) as Customer[]
  } catch (error) {
    console.error(error)
    return []
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
