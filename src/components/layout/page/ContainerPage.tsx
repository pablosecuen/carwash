import { cn } from '@/lib/utils'
import { Breadcrumbs } from '../breadcrumb/Breadcrumb'

interface Props {
  children: React.ReactNode
  className?: string
}

export const ContainerPage = ({ children, className }: Props) => {
  return (
    <main className={cn('space-y-4 p-4 sm:px-6 ', className)}>
      <Breadcrumbs />
      {children}
    </main>
  )
}
