import type { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'

const sanitizeNumer = (value: number) => {
  return isNaN(Number(value)) ? 0 : Number(value)
}
export abstract class BaseRepository<Entity extends ObjectLiteral> {
  protected repository!: Repository<Entity>
  protected isInicializated: boolean = false
  protected abstract entity: EntityTarget<Entity>

  async init() {
    if (this.isInicializated) return
    try {
      if (!AppDataSource.isInitialized) await AppDataSource.initialize()
      this.repository = AppDataSource.getRepository(this.entity)
      this.isInicializated = true
    } catch (error) {
      // TODO: handler error properly
      console.error('Error initializing AppDataSource', error)
      throw error
    }
  }

  protected formatMetadataForPagination(props: { count: number; limit: number; offset: number }) {
    // Sanitize values
    const total = sanitizeNumer(props.count)
    const limit = sanitizeNumer(props.limit) <= 0 ? 1 : sanitizeNumer(props.limit)
    const offset = sanitizeNumer(props.offset)
    return {
      total,
      totalPages: total === 0 ? 0 : Math.floor(total / limit),
      currentPage: offset === 0 ? 0 : Math.floor(offset / limit),
      prevPage: offset - limit < 0 ? null : Math.floor((offset - limit) / limit),
      nextPage: offset + limit >= total ? null : Math.floor((offset + limit) / limit)
    }
  }
}
