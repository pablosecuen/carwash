'use server'
import { customerRepository } from '@/db/repositories/customer'

export async function createCustomerAction(formData: FormData) {
  // TODO: Validate form data
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
    currentAccount: false
  }
  try {
    const customer = await customerRepository.create(data)
    console.log('Customer created:', customer)
  } catch (error) {
    console.error('Error creating customer:', error)
  }
}
