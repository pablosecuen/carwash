import { createProducts } from '@/db/seeds/products'
import { NextResponse } from 'next/server'

let isCreated = false

export async function GET() {
  if (!isCreated && process.env.NODE_ENV === 'development') {
    await createProducts()
    isCreated = true
  }
  return NextResponse.json({
    message: 'Products created successfully!'
  })
}
