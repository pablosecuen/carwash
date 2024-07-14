'use client'

import { getResumeCurrentAccountToExcel } from '@/actions/invoice/get-resume-current-account'
import { Button } from '@/components/ui/button'
import { exportToExcel } from '@/utils/export-to-excel'

export function ExportToExcelCurrentAccount() {
  return (
    <Button
      size='sm'
      onClick={async () => {
        const { exportData } = await getResumeCurrentAccountToExcel()
        exportToExcel({
          exportData,
          fileName: 'resumen-cuentas-corrientes.xlsx',
          sheetName: 'Resumen cuentas corrientes'
        })
      }}
    >
      Exportar resumen de cuentas corrientes
    </Button>
  )
}
