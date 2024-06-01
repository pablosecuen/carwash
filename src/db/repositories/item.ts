import { type Invoice } from '../entities/invoice'
import { Item } from '../entities/item'
import { BaseRepository } from './base-repository'

export class ItemRepository extends BaseRepository<Item> {
  protected entity = Item

  async create(data: Omit<Item, 'id' | 'createdAt' | 'invoice'>) {
    await this.init()
    const item = this.repository.create({
      ...data,
      createdAt: new Date()
    })
    await this.repository.save(item)
    return item
  }

  async findByInvoiceId({ invoiceId }: { invoiceId: number }) {
    await this.init()
    const items = await this.repository.find({
      where: {
        invoice: {
          id: invoiceId
        }
      },
      relations: {
        invoice: true
      }
    })
    return { items }
  }

  async setInvoice({ itemId, invoice }: { itemId: number; invoice: Invoice }) {
    await this.init()
    const item = await this.repository.findOne({
      where: {
        id: itemId
      }
    })
    if (item == null) throw new Error('Item not found')

    item.invoice = invoice

    await this.repository.save(item)
  }
}

export const itemRepository = new ItemRepository()
