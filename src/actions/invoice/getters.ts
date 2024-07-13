import { invoiceRepository } from '@/db/repositories/invoice'
import { type Branch } from '@/utils/types'
import { getBranch, hasPermission } from '@/utils/user-validate'

const DEFAULT_METADATA = {
  total: 0,
  currentPage: 0,
  totalPages: 0,
  prevPage: null,
  nextPage: null
}

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
        items: true
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
        items: true
      }
    })
    console.log({ metadata })
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
  sort,
  from,
  to
}: {
  page: number | string
  limit?: number | string
  branch: Branch | undefined
  customerName?: string
  from?: string
  to?: string
  sort?: {
    sortBy?: string
    sortDir?: 'ASC' | 'DESC'
  }
}) => {
  const today = new Date(from ?? new Date())
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  try {
    const { invoices, metadata } = await invoiceRepository.findAll({
      customerName,
      branch,
      sort,
      limit: Number(limit),
      offset: Number(page) * Number(limit),
      joins: {
        customer: true,
        tickets: {
          service: true,
          vehicle: true
        },
        items: {
          product: true
        }
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
  limit = 8,
  branch = undefined,
  query,
  from,
  sort,
  to
}: {
  page: number | string
  limit?: number | string
  branch: Branch | undefined
  query?: string
  from?: string
  to?: string
  sort?: {
    sortBy?: string
    sortDir?: 'ASC' | 'DESC'
  }
}) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setHours(23, 59, 59, 999)

  console.log({ sort })
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
        items: {
          product: true
        }
      },
      sort,
      from:
        from != null
          ? (() => {
              const date = new Date(from)
              date.setHours(0, 0, 0, 0)
              return date
            })()
          : today,
      to:
        to != null
          ? (() => {
              const date = new Date(to)
              date.setHours(23, 59, 59, 999)
              return date
            })()
          : tomorrow
    })

    console.log({ totals: invoices.map((i) => i.total) })
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

export const getInvoicesToCashClosure = async ({
  hasCurrentAccount
}: { hasCurrentAccount?: boolean } = {}) => {
  try {
    const branch = getBranch()
    const { invoices, metadata } = await invoiceRepository.findAll({
      branch,
      status: ['completed', 'cancelled'],
      cashClosure: null,
      withCurrentAccount: hasCurrentAccount,
      joins: {
        customer: true,
        tickets: {
          service: true
        },
        items: {
          product: true
        }
      }
    })
    return {
      metadata,
      invoices: JSON.parse(JSON.stringify(invoices)) as typeof invoices
    }
  } catch (error) {
    console.log(error)
    return {
      invoices: [],
      metadata: DEFAULT_METADATA
    }
  }
}

export const getInvoiceDetails = async ({ id }: { id: number }) => {
  return await invoiceRepository.findById(id, {
    joins: {
      items: {
        product: true
      },
      tickets: {
        service: true,
        vehicle: true
      },
      customer: true
    }
  })
}
