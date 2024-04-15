'use server'
import { customerRepository } from '@/db/repositories/customer'
import { revalidatePath } from 'next/cache'

export async function createCustomerAction(formData: FormData) {
  // TODO: Validate form data
  const name = formData.get('name') as string
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
    currentAccount: false,
    slug: name.replace(/ /g, '_').toLocaleLowerCase()
  }
  try {
    const customer = await customerRepository.create(data)
    console.log('Customer created:', customer)

    // TODO: Revalidar los path que se encuentren los customers
    revalidatePath('/service/customers')
  } catch (error) {
    console.error('Error creating customer:', error)
  }
}
