import { getAllCustomers } from '@/utils/getters/customer'
import React from 'react'

export const TableCustomers = async () => {
  const customers = await getAllCustomers()
  return (
    <>
      <h1>customers table</h1>
    </>
  )
}
