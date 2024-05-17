import { invoiceRepository } from '@/db/repositories/invoice'
import { type Branch } from '@/utils/types'
import { getBranch, hasPermission } from '@/utils/user-validate'

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
    const { invoices, metadata } = await invoiceRepository.findAll({
      branch,
      from: today,
      to: tomorrow,
      joins: {
        customer: true,
        tickets: true,
        products: true
      }
    })

    return {
      metadata,
      invoices: JSON.parse(JSON.stringify(invoices)) as typeof invoices
    }
  } catch (error) {
    console.log(error)
    return { invoices: [] }
  }
}

export const getPaginatedInvoices = async ({
  page = 0,
  limit = 10
}: {
  page: number | string
  limit?: number | string
}) => {
  try {
    const branch = (await hasPermission()) ? undefined : getBranch()
    const { invoices, metadata } = await invoiceRepository.findAll({
      branch,
      offset: Number(page) * Number(limit),
      joins: {
        customer: true,
        tickets: {
          service: true,
          vehicle: true
        },
        products: true
      }
    })
    return {
      metadata,
      invoices: JSON.parse(JSON.stringify(invoices)) as typeof invoices
    }
  } catch (error) {
    console.log(error)
    return {
      invoices: []
    }
  }
}

export const getPaginatedInvoicesByBranch = async ({
  page = 0,
  limit = 20,
  branch = undefined,
  customerName,
  from,
  to
}: {
  page: number | string
  limit?: number | string
  branch: Branch | undefined
  customerName?: string
  from?: string
  to?: string
}) => {
  const today = new Date(from ?? new Date())
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  try {
    const { invoices, metadata } = await invoiceRepository.findAll({
      customerName,
      branch,
      limit: Number(limit),
      offset: Number(page) * Number(limit),
      joins: {
        customer: true,
        tickets: {
          service: true,
          vehicle: true
        },
        products: true
      },
      from: today,
      to: tomorrow
    })

    return {
      metadata,
      invoices: JSON.parse(JSON.stringify(invoices)) as typeof invoices
    }
  } catch (error) {
    console.log(error)
    return {
      invoices: []
    }
  }
}

export const getPaginatedInvoicesByBranchDashboard = async ({
  page = 0,
  limit = 20,
  branch = undefined,
  query
}: {
  page: number | string
  limit?: number | string
  branch: Branch | undefined
  query?: string
}) => {
  try {
    const { invoices, metadata } = await invoiceRepository.findAll({
      customerName: query,
      branch,
      limit: Number(limit),
      offset: Number(page) * Number(limit),
      joins: {
        customer: true,
        tickets: {
          service: true,
          vehicle: true
        },
        products: true
      }
    })

    return {
      metadata,
      invoices: JSON.parse(JSON.stringify(invoices)) as typeof invoices
    }
  } catch (error) {
    console.log(error)
    return {
      invoices: []
    }
  }
}
