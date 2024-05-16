import { type Branch } from '@/utils/types'
import { CashClosures } from '../entities/cash-closures'
import { BaseRepository } from './base-repository'

interface FilterOpts {
  branch?: Branch
  limit?: number
  offset?: number
}

export class CashClosuresRepository extends BaseRepository<CashClosures> {
  protected entity = CashClosures
  async create(data: Omit<CashClosures, 'id'>) {
    await this.init()
    const cashClosure = this.repository.create({
      ...data,
      createdAt: new Date()
    })
    await this.repository.save(cashClosure)
    return cashClosure
  }

  async findAll(opts: FilterOpts = {}) {
    const { branch, limit = 20, offset = 0 } = opts
    await this.init()
    // TODO: add status filter
    const whereClause = {
      branch
    }
    const [cashClosures, count] = await Promise.all([
      this.repository.find({
        where: whereClause,
        order: {
          createdAt: 'DESC'
        },
        take: limit,
        skip: offset
      }),
      this.repository.count({
        where: whereClause
      })
    ])
    return {
      cashClosures,
      metadata: { total: count, totalPages: Math.ceil(count / limit), currentPage: offset / limit }
    }
  }
}

export const cashClosuresRepository = new CashClosuresRepository()
