import { cashClosuresRepository } from '@/db/repositories/cash-closures'
import { type Branch } from '@/utils/types'
import { getBranch, hasPermission } from '@/utils/user-validate'

export const getAllCashClosures = async (ops: { page?: number | string; branch?: Branch } = {}) => {
  try {
    const isAdmin = await hasPermission('ADMIN')
    const page = ops?.page != null ? Number(ops.page) : 0
    const { cashClosures, metadata } = await cashClosuresRepository.findAll({
      branch: isAdmin ? ops?.branch : getBranch(),
      offset: page * 20
    })
    return {
      metadata,
      cashClosures: JSON.parse(JSON.stringify(cashClosures)) as typeof cashClosures
    }
  } catch (error) {
    console.error(error)
    return { cashClosures: [] }
  }
}
