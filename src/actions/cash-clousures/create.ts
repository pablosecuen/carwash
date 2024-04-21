'use server'
import { cashClosuresRepository } from '@/db/repositories/cash-clousures'
import { type Branch } from '@/utils/types'
import { cookies } from 'next/headers'

export async function createCashClosureAction(formData: FormData) {
  try {
    const branch = cookies().get('branch')?.value as Branch

    const cashClosed = await cashClosuresRepository.create({
      branch,
      createdAt: new Date(),
      totalDaily: Number(formData.get('totalDaily')),
      dailyPercentage: Number(formData.get('dailyPercentage')),
      managerBonus: Number(formData.get('managerBonus')),
      employeePayment: Number(formData.get('employeePayment'))
    })
    return JSON.parse(JSON.stringify(cashClosed)) as typeof cashClosed
  } catch (error) {
    console.error(error)
  }
}
