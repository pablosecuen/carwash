import { type Branch } from '@/utils/types'
import { CashClosures } from './../entities/cash-closures'
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
    return await this.repository.find({
      where: {
        branch
      },
      order: {
        createdAt: 'DESC'
      },
      take: limit,
      skip: offset
    })
  }
}

export const cashClosuresRepository = new CashClosuresRepository()
