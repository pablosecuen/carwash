import { type Invoice } from '@/db/entities'
import { cashClosuresRepository } from '@/db/repositories/cash-closures'
import { invoiceRepository } from '@/db/repositories/invoice'
import { getBranch } from '@/utils/user-validate'

export async function createCashClosureAction({ invoices }: { invoices: Invoice[] }) {
  'use server'
  return async (formData: FormData) => {
    'use server'
    try {
      const branch = getBranch()
      const cashClosed = await cashClosuresRepository.create({
        branch,
        invoices,
        createdAt: new Date(),
        totalDaily: Number(formData.get('totalDaily')),
        dailyPercentage: Number(formData.get('dailyPercentage')),
        managerBonus: Number(formData.get('managerBonus')),
        employeeBonus: Number(formData.get('employeeBonus')),
        employeePayment: Number(formData.get('employeePayment')),
        totalCanceled: Number(formData.get('totalCanceled') ?? 0)
      })
      await invoiceRepository.setCashClosure({ invoices, cashClosure: cashClosed })
      return JSON.parse(JSON.stringify(cashClosed)) as typeof cashClosed
    } catch (error) {
      console.error(error)
    }
  }
}
