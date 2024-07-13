'use server'
import { type Customer } from '@/db/entities'
import { customerRepository } from '@/db/repositories/customer'
import { getBranch, hasPermission } from '@/utils/user-validate'

export async function getAllCustomers({
  name,
  vehicles,
  withCurrentAccount,
  sort
}: {
  name?: string
  vehicles?: boolean
  withCurrentAccount?: boolean
  sort?: {
    sortBy?: string
    orderDir?: 'ASC' | 'DESC'
  }
} = {}) {
  try {
    const isAdmin = await hasPermission('ADMIN')
    const { customers, metadata } = await customerRepository.findAll({
      name,
      sort,
      currentAccount: isAdmin ? withCurrentAccount : undefined,
      joins: {
        vehicles
      },
      branch: isAdmin ? undefined : getBranch()
    })
    return {
      metadata,
      customers: JSON.parse(JSON.stringify(customers)) as typeof customers
    }
  } catch (error) {
    console.error(error)
    return {
      metadata: { total: 0, totalPages: 0, currentPage: 0 },
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
