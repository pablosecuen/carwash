'use server'

import { customerRepository } from '@/db/repositories/customer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const updateCusstomer = async (slug: string, formData: FormData) => {
  const data = Object.fromEntries(formData)

  try {
    const customerUpadted = await customerRepository.updateBySlug(slug, data)

    revalidatePath(`/service/customers`)
    revalidatePath(`/service/customers/${slug}`)
    redirect(`/service/customers`)
  } catch (error) {}
}
