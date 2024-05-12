// TODO: poner esto en las paginas que lo requieran
// Opt out of caching for all data requests in the route segment

import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { TableInvoices } from './ui/TableInvoices'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { type Branch } from '@/utils/types'
import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic'

enum BranchType {
  ONE,
  TWO,
  THREE
}

export default function InvoicesPage({
  searchParams
}: {
  searchParams?: {
    page: string
    branch: Branch
    query?: string
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
      <Title title={`Facturas de la sucursal ${branch}`} />

      <Suspense
        fallback={
          <div className='grid min-h-[60vh] place-content-center'>
            <Loader2 className='h-5 w-5 animate-spin  md:h-14 md:w-14' />
          </div>
        }
      >
        <TableInvoices params={searchParams} />
      </Suspense>
    </ContainerPage>
  )
}
