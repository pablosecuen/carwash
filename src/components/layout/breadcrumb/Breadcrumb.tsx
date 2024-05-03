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
import { Fragment } from 'react'

interface Props {
  className?: string
}

// move this code -> new file
const translationMap: Record<string, string> = {
  products: 'Productos',
  product: 'Producto',
  service: 'Servicio',
  services: 'Servicio',
  'create-service': 'Crear Servicio',
  'new-product': 'Crear producto',
  'new-service': 'Crear servicio',
  'new-ticket': 'Crear ticket',
  customers: 'Clientes',
  'add-customer': 'Crear cliente',
  invoices: 'Facturas'
}

export const Breadcrumbs = ({ className }: Props) => {
  const pathname = usePathname()

  const getBradcrumbArr = (pathname: string) => {
    const pathArr = pathname.split('/')
    const breadcrumb = pathArr.map((item, index) => {
      if (item.includes('_')) {
        const name = item
          .split('_')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' ')

        return {
          path: pathArr.slice(0, index + 1).join('/'),
          name
        }
      }
      const translatedName = translationMap[item] ?? item
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
    <div className='flex items-center justify-start gap-x-5'>
      <Breadcrumb className={cn('', className)}>
        <BreadcrumbList>
          {breadcrumbArr.map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.path}
                  className={cn(
                    'capitalize',
                    index === breadcrumbArr.length - 1
                      ? 'font-semibold text-primary fade-in'
                      : 'font-normal'
                  )}
                >
                  {item.name === '' ? 'Inicio' : item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator
                key={`${index}-${index + 1}`}
                className={cn(
                  'capitalize',
                  index === breadcrumbArr.length - 1 ? 'text-primary fade-in' : ''
                )}
              />
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
