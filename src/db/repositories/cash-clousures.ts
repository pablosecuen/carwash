import { CashClosures } from './../entities/cash-closures'
import { BaseRepository } from './base-repository'

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
}

export const cashClosuresRepository = new CashClosuresRepository()
