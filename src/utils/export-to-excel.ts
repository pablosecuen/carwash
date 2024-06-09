import * as XLSX from 'xlsx'

export function exportToExcel({
  exportData,
  sheetName = 'Sheet1',
  fileName = 'export.xlsx'
}: {
  exportData: Array<Record<string, string | number | Date>>
  sheetName?: string
  fileName?: string
}) {
  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  const data = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  // const fileName = 'cierres-de-caja-historial.xlsx'
  const url = window.URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
