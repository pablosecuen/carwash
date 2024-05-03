import { invoiceRepository } from '@/db/repositories/invoice'
import { sleep } from '@/lib/utils'
import { Branch } from '@/utils/types'
import { getBranch, hasPermission } from '@/utils/user-validate'
import { cookies } from 'next/headers'

export async function getInvoicesByCustomerId(
  customerId: string,
  options: { from?: Date; to?: Date } = {}
) {
  return await invoiceRepository.findByCustomerId(customerId, options)
}

export const getDailyInvoices = async () => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const branch = getBranch()
    const invoices = await invoiceRepository.findAll({
      branch,
      from: today,
      to: tomorrow
    })
    return JSON.parse(JSON.stringify(invoices)) as typeof invoices
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getPaginatedInvoices = async ({
  page = 1,
  limit = 10
}: {
  page: number | string
  limit?: number | string
}) => {
  try {
    const branch = (await hasPermission()) ? undefined : getBranch()
    const invoices = await invoiceRepository.findAll({
      branch,
      limit: Number(limit),
      offset: Number(page) * Number(limit),
      joins: {
        customer: true,
        tickets: true,
        products: true
      }
    })
    return JSON.parse(JSON.stringify(invoices)) as typeof invoices
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getPaginatedInvoicesByBranch = async ({
  page = 1,
  limit = 0
}: {
  page: number | string
  limit?: number | string
}) => {
  try {
    const branch = (cookies().get('branch')?.value as Branch) ?? undefined

    const invoices = await invoiceRepository.findAll({
      branch,
      limit: Number(limit),
      offset: Number(page) * Number(limit),
      joins: {
        customer: true,
        tickets: true,
        products: true
      }
    })

    return JSON.parse(JSON.stringify(invoices)) as typeof invoices
  } catch (error) {
    console.log(error)
    return []
  }
}
