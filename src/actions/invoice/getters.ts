import { invoiceRepository } from '@/db/repositories/invoice'
import { getBranch } from '@/utils/user-validate'

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
