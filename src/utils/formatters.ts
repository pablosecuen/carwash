export const listFormater = (list: Iterable<string>, options: Intl.ListFormatOptions = {}) =>
  new Intl.ListFormat('es', { style: 'long', type: 'conjunction', ...options }).format(list)

export const DateFormatter = (date?: Date | number, options: Intl.DateTimeFormatOptions = {}) =>
  new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  }).format(date)
