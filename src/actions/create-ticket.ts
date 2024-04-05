'use server'
export async function createTicketAction(formData: FormData) {
  const data = {
    vehicleId: formData.get('vehicle') as string,
    serviceId: formData.get('service') as string,
    paymentMethod: formData.get('paymentMethod') as string
  }
  console.log({ data })
}
