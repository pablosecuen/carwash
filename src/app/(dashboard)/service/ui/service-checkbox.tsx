import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  id: string
  label: string
}

export const ServiceCheckbox = ({ id, label }: Props) => {
  return (
    <div className='flex items-center space-x-2 '>
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </label>
    </div>
  )
}
