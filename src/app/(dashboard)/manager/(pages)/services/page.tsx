import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { type Branch } from '@/utils/types'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { TableServices } from './ui/TableServices'

enum BranchType {
  ONE,
  TWO,
  THREE
}

export default function ServicesPage({
  searchParams
}: {
  searchParams?: {
    page: string
    branch: Branch
  }
}) {
  const branch = searchParams?.branch
  if (branch == null) {
    redirect('/manager')
  }
  function isValidBranch(branch: Branch) {
    return Object.values(BranchType).includes(branch)
  }
  if (!isValidBranch(branch)) {
    redirect('/manager')
  }
  return (
    <ContainerPage>
      <Title title={`Servicios de la sucursal ${branch}`} />

      <Suspense
        fallback={
          <div className='grid min-h-[60vh] place-content-center'>
            <Loader2 className='h-5 w-5 animate-spin  md:h-14 md:w-14' />
          </div>
        }
      >
        <TableServices params={searchParams} />
      </Suspense>
    </ContainerPage>
  )
}
