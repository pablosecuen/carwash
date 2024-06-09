import { cashClosuresRepository } from '@/db/repositories/cash-closures'
import { type Branch } from '@/utils/types'
import { getBranch, hasPermission } from '@/utils/user-validate'

export const getAllCashClosures = async (
  ops: {
    page?: number | string
    branch?: Branch
    sort?: {
      sortBy?: string
      sortDir?: 'ASC' | 'DESC'
    }
  } = {}
) => {
  try {
    const isAdmin = await hasPermission('ADMIN')
    const page = ops?.page != null ? Number(ops.page) : 0
    const { cashClosures, metadata } = await cashClosuresRepository.findAll({
      branch: isAdmin ? ops?.branch : getBranch(),
      offset: page * 20,
      sort: ops.sort
    })
    return {
      metadata,
      cashClosures: JSON.parse(JSON.stringify(cashClosures)) as typeof cashClosures
    }
  } catch (error) {
    console.error(error)
    return {
      cashClosures: [],
      metadata: {
        total: 0,
        totalPages: 0,
        currentPage: 0,
        prevPage: null,
        nextPage: null
      }
    }
  }
}

export const getCashClosureDetails = async (id: string) => {
  try {
    const { cashClosure } = await cashClosuresRepository.findById({
      id: Number(id),
      joins: {
        invoices: true
      }
    })
    return { cashClosure: JSON.parse(JSON.stringify(cashClosure)) as typeof cashClosure }
  } catch (error) {
    console.error(error)
    return { cashClosure: null }
  }
}
