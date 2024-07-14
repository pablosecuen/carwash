'use server'

import { invoiceRepository } from '@/db/repositories/invoice'
import { getAllServices } from '../service/getters'
import { getAllProducts } from '../product/getters'

const getYearToYear = () => {
  const now = Date.now()
  const yearInMs = 1000 * 60 * 60 * 24 * 365
  return new Date(now - yearInMs)
}

export async function getResumeCurrentAccountToExcel() {
  const { invoices } = await invoiceRepository.findAll({
    withCurrentAccount: true,
    from: getYearToYear(),
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
  const allServices = await getAllServices()
  const allProducts = await getAllProducts()
  const servicesAndProductsDicc = {
    ...allServices.reduce<Record<string, number>>((acc, service) => {
      acc[service.name] = 0
      return acc
    }, {}),
    ...allProducts.reduce<Record<string, number>>((acc, product) => {
      acc[product.name] = 0
      return acc
    }, {})
  }

  const exportToExcelData = new Map<string, Record<string, string | number | Date>>()
  for (let i = 0; i < invoices.length; i++) {
    const invoice = invoices[i]
    const month = new Date(invoice.createAt).getMonth()
    const year = new Date(invoice.createAt).getFullYear()

    const id = `${invoice.customer.id}-${year}-${month}`
    let data: Record<string, string | number | Date> = {
      id: invoice.customer.id,
      mes: `${month + 1}/${year}`,
      nombre: invoice.customer.name,
      ...servicesAndProductsDicc
    }
    if (exportToExcelData.has(id)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      data = exportToExcelData.get(id)!
    }
    data.id = invoice.customer.id
    data.name = invoice.customer.name
    invoice.items.forEach((item) => {
      data[item.product.name] = (data[item.product.name] as number) + 1
    })

    invoice.tickets.forEach((item) => {
      if (item.service != null) {
        data[item.service.name] = (data[item.service.name] as number) + 1
      }
    })
    exportToExcelData.set(id, data)
  }
  const exportData = Array.from(exportToExcelData.values())
  return { exportData }
}
