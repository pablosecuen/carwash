import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <ContainerPage>
      <Title title='Facturas' />

      <div className='grid h-[80dvh] w-full animate-pulse place-content-center rounded-lg bg-muted/80'>
        <LoaderCircleIcon className='h-12 w-12 animate-spin text-primary' />
      </div>
    </ContainerPage>
  )
}
