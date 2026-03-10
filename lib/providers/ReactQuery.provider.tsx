'use client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

type Props = {
  children: ReactNode
  locale?: string
}

export const ReactQueryClientProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
