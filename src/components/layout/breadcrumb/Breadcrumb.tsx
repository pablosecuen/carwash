'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface Props {
  className?: string
}

const translationMap: { [key: string]: string } = {
  products: 'Productos',
  product: 'Producto',
  services: 'Servicio',
  'create-service': 'Crear Servicio',
  'new-product': 'Crear producto'
}

export const Breadcrumbs = ({ className }: Props) => {
  const pathname = usePathname()

  const getBradcrumbArr = (pathname: string) => {
    const pathArr = pathname.split('/')
    const breadcrumb = pathArr.map((item, index) => {
      const translatedName = translationMap[item] || item
      const path = pathArr.slice(0, index + 1).join('/')
      return {
        path,
        name: translatedName
      }
    })
    return breadcrumb
  }
  const breadcrumbArr = getBradcrumbArr(pathname)

  return (
    <Breadcrumb className={cn('fade-in', className)}>
      <BreadcrumbList>
        {breadcrumbArr.map((item, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={item.path}
                className={cn(
                  'capitalize',
                  index === breadcrumbArr.length - 1 ? 'font-semibold text-primary' : 'font-normal'
                )}
              >
                {item.name === '' ? 'Inicio' : item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key={`${index}-${index + 1}`} />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
