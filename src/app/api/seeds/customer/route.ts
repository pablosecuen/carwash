import { createCustomers } from '@/db/seeds/customers'
import { NextResponse } from 'next/server'

let isCreated = false

export async function GET() {
  try {
    if (!isCreated && process.env.NODE_ENV === 'development') {
      await createCustomers()
      isCreated = true
    }
    return NextResponse.json({
      message: 'Customers created successfully!'
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Error creating customers!'
    })
  }
}
