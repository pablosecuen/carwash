import { ObjectLiteral, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'

type Class = new (...args: any[]) => any

export abstract class BaseRepository<Entity extends ObjectLiteral> {
  protected repository!: Repository<Entity>
  protected isInicializated: boolean = false
  protected abstract entity: Class

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
}
