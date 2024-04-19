import { type Customer } from '@/db/entities'

export function formatSlugFromCustomer(customer: Customer) {
  const { name, id } = customer
  return `${name.toLowerCase().replaceAll(/ /g, '-')}-${id}`
}

export function extractCustomerIdFromSlug(slug: string) {
  const separatedSlug = slug.split('-')
  if (separatedSlug.length <= 1) {
    throw new Error('Invalid slug')
  }
  return Number(separatedSlug.pop())
}

export function extractCustomerNameFromSlug(slug: string) {
  const separatedSlug = slug.split('-')
  if (separatedSlug.length <= 1) {
    throw new Error('Invalid slug')
  }
  return separatedSlug
    .slice(0, separatedSlug.length - 1)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
