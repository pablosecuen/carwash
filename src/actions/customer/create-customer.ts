'use server'
import { customerRepository } from '@/db/repositories/customer'
import { getBranch } from '@/utils/user-validate'
import { revalidatePath } from 'next/cache'

export async function createCustomerAction(formData: FormData) {
  // TODO: Validate form data
  const name = formData.get('name') as string
  try {
    const data = {
      name,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      currentAccount: false,
      slug: name.replace(/ /g, '_').toLocaleLowerCase(),
      branch: getBranch()
    }
    const customer = await customerRepository.create(data)
    console.log('Customer created:', customer)

    // TODO: Revalidar los path que se encuentren los customers
    revalidatePath('/service/customers')
    return JSON.parse(JSON.stringify(customer)) as typeof customer
  } catch (error) {
    console.error('Error creating customer:', error)
  }
}
