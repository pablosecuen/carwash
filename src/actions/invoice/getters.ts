import { invoiceRepository } from '@/db/repositories/invoice'
import { type Branch } from '@/utils/types'
import { getBranch } from '@/utils/user-validate'
import { cookies } from 'next/headers'

export async function getInvoicesByCustomerId(
  customerId: string,
  options: { from?: Date; to?: Date } = {}
) {
  return await invoiceRepository.findByCustomerId(customerId, options)
}

export const getDailyInvoices = async () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const branch = cookies().get('branch')?.value as Branch
  const invoices = await invoiceRepository.findAll({
    branch,
    from: today,
    to: tomorrow
  })
  return JSON.parse(JSON.stringify(invoices)) as typeof invoices
}

export const getPaginatedInvoices = async ({
  page,
  limit = 20
}: {
  page: number | string
  limit?: number | string
}) => {
  try {
    const branch = getBranch()
    const invoices = await invoiceRepository.findAll({
      branch,
      limit: Number(limit),
      offset: Number(page) * Number(limit)
    })
    return JSON.parse(JSON.stringify(invoices)) as typeof invoices
  } catch (error) {
    console.log(error)
    return []
  }
}
