export async function createCustomerAction(formData: FormData) {
  'use server'
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string
  }
  console.log(data)
}
