import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { sleep } from '@/lib/utils'
import { getAllCustomers } from '@/actions/customer/getters'

export const SelectCustomer = async () => {
  await sleep(2000)
  const customers = await getAllCustomers()
  if (customers.length === 0)
    return (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder='No hay clientes agregados' />
        </SelectTrigger>
      </Select>
    )
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Selecciona un cliente' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {customers.map((customer) => {
            return (
              <SelectItem
                key={customer.id}
                value={customer.name}
                className='capitalize hover:cursor-pointer'
              >
                {customer.name}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
