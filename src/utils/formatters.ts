export const listFormater = (list: Iterable<string>, options: Intl.ListFormatOptions = {}) =>
  new Intl.ListFormat('es', { style: 'long', type: 'conjunction', ...options }).format(list)

export const DateFormatter = (date?: Date | number, options: Intl.DateTimeFormatOptions = {}) =>
  new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  }).format(date)

export const obtenerFechaActual = () => {
  const fecha = new Date()
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const año = fecha.getFullYear()
  return `${dia}/${mes}/${año}`
}

export const translateStatus = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pendiente'
    case 'in_progress':
      return 'En progreso'
    case 'completed':
      return 'Completado'
    default:
      return status
  }
}
