import React from 'react'
import { ClientField } from './client-field'
import { getCustomersByName } from '@/actions/customer/getters'

interface Props {
  customerName: string
}

export const CustomerFieldServer = async ({ customerName }: Props) => {
  const customers = await getCustomersByName(customerName)
  return (
    <>
      <ClientField customers={customers} />
    </>
  )
}
