import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface Props {
  id: string
  label: string
  className?: string
}

export const ServiceCheckbox = ({ id, label, className }: Props) => {
  return (
    <div className={cn('flex items-center space-x-2 ', className)}>
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
