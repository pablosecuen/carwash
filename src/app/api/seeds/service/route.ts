import { createServices } from '@/db/seeds/services'
import { NextResponse } from 'next/server'

let isCreated = false

export async function GET() {
  try {
    if (!isCreated && process.env.NODE_ENV === 'development') {
      await createServices()
      isCreated = true
    }
    return NextResponse.json({
      message: 'Services created successfully!'
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: 'Error creating services!'
    })
  }
}
