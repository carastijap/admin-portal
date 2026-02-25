'use server'
import { headers } from 'next/headers'

export const getHost = async () => {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  return host.includes('localhost') ? 'http://' : 'https://'
}
