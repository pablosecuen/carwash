'use server'
import { type Invoice } from '@/db/entities'
import { cashClosuresRepository } from '@/db/repositories/cash-closures'
import { invoiceRepository } from '@/db/repositories/invoice'
import { getBranch } from '@/utils/user-validate'

export async function createCashClosureAction(invoices: Invoice[], formData: FormData) {
  try {
    const branch = getBranch()

    const cashClosed = await cashClosuresRepository.create({
      branch,
      invoices,
      createdAt: new Date(),
      totalDaily: Number(formData.get('totalDaily')),
      totalDailyCash: Number(formData.get('totalDailyCash')),
      totalCash: Number(formData.get('totalCash')),
      totalCard: Number(formData.get('totalCard')),
      dailyPercentage: Number(formData.get('dailyPercentage')),
      managerBonus: Number(formData.get('managerBonus')),
      employeeBonus: Number(formData.get('employeeBonus')),
      employeePayment: Number(formData.get('employeePayment')),
      employeesNum: Number(formData.get('employeesNum')),
      totalCanceled: Number(formData.get('totalCanceled') ?? 0)
    })
    await invoiceRepository.setCashClosure({ invoices, cashClosure: cashClosed })
    return {
      ok: true,
      message: 'Cierre de caja realizado con éxito',
      cashClosed: JSON.parse(JSON.stringify(cashClosed)) as typeof cashClosed
    }
  } catch (error) {
    console.error(error)
    return { ok: false, message: 'Error al cerrar caja', cashClosed: null }
  }
}
