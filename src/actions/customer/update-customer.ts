'use server'

import { customerRepository } from '@/db/repositories/customer'
import { extractCustomerIdFromSlug } from '@/utils/slug'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateCustomerBySlug(slug: string, formData: FormData) {
  const data = Object.fromEntries(formData)

  try {
    const customerId = extractCustomerIdFromSlug(slug)
    await customerRepository.updateById(customerId, data)

    revalidatePath(`/service/customers`)
    revalidatePath(`/service/customers/${slug}`)
    redirect(`/service/customers`)
  } catch (error) {}
}
