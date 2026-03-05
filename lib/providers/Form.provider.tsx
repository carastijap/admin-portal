'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  DefaultValues,
  Resolver,
} from 'react-hook-form'
import { createContext, ReactNode } from 'react'


export type FormModes =
  | 'all'
  | 'onBlur'
  | 'onChange'
  | 'onSubmit'
  | 'onTouched'

type HookFormProviderProps<T extends FieldValues> = {
  children: ReactNode
  schema?: unknown
  defaultValues?: DefaultValues<T>
  mode?: FormModes
  id?: string
  onSubmit: SubmitHandler<T>
}

export const HookFormContext = createContext<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: SubmitHandler<any>
} | null>(null)

export function HookFormProvider<T extends FieldValues>({
  children,
  schema,
  defaultValues,
  mode = 'onSubmit',
  id,
  onSubmit,
}: HookFormProviderProps<T>) {
  const methods = useForm<T, unknown, T>({
    defaultValues,
    mode,
    resolver: schema
      ? (zodResolver(
          schema as Parameters<typeof zodResolver>[0]
        ) as Resolver<T, unknown, T>)
      : undefined,
  })

  return (
    <FormProvider {...methods}>
      <HookFormContext.Provider value={{ onSubmit }}>
        <form id={id} onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </HookFormContext.Provider>
    </FormProvider>
  )
}