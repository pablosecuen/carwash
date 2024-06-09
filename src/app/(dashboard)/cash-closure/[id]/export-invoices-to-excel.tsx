'use client'
import { Button } from '@/components/ui/button'
import { type Invoice } from '@/db/entities'
import { exportToExcel } from '@/utils/export-to-excel'

export function ExportInvoicesToExcel({
  invoices,
  fileName
}: {
  invoices: Invoice[]
  fileName: string
}) {
  return (
    <Button
      size='sm'
      onClick={() => {
        const exportData = invoices.map(({ id, branch, customer, createAt, status, total }) => ({
          ID: id,
          Sucursal: branch,
          Cliente: customer.name,
          Status: status,
          Total: total,
          Fecha: createAt
        }))
        exportToExcel({
          exportData,
          fileName,
          sheetName: 'Facturas'
        })
      }}
    >
      Export facturas a excel
    </Button>
  )
}
