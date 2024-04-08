'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'

interface Props {
  className?: string
}

export const Breadcrumbs = ({ className }: Props) => {
  const pathname = usePathname()

  const getBradcrumbArr = (pathname: string) => {
    const pathArr = pathname.split('/')
    const breadcrumb = pathArr.map((item, index) => {
      const path = pathArr.slice(0, index + 1).join('/')
      return {
        path,
        name: item
      }
    })
    return breadcrumb
  }
  const breadcrumbArr = getBradcrumbArr(pathname)

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbArr.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={item.path} className='capitalize'>
              {item.name === '' ? 'Inicio' : item.name}
            </BreadcrumbLink>

            <BreadcrumbSeparator />
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
