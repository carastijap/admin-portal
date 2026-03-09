'use client'

import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

type Props = {
  children: ReactNode
  locale?: string
}

export const ReactQueryClientProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => {
    const defaultOptions: QueryClientConfig['defaultOptions'] = {
      queries: {
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 0, // no automatic retries
      },
      mutations: {
        retry: 0,
      },
    }

    return new QueryClient({ defaultOptions })
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
