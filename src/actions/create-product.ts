'use server'

export async function createProductAction(formData: FormData) {
  const data = Object.fromEntries(formData) as {
    name: string
    description: string
    cashPrice: string
    cardPrice: string
  }
  console.log(data)
}
