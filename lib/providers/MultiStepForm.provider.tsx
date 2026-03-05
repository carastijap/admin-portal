'use client'

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'

type MultiStepFormContextValue = {
  currentStep: number
  totalSteps: number
  previousSteps: number[]
  isFirstStep: boolean
  isLastStep: boolean
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
}

type MultiStepFormProviderProps = {
  children: ReactNode
  totalSteps: number
  initialStep?: number
}

const MultiStepFormContext = createContext<MultiStepFormContextValue | null>(null)

export function MultiStepFormProvider({
  children,
  totalSteps,
  initialStep = 1,
}: MultiStepFormProviderProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, totalSteps)))
  }, [totalSteps])

  const nextStep = useCallback(() => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps))
  }, [totalSteps])

  const previousStep = useCallback(() => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
  }, [])

  const value = useMemo<MultiStepFormContextValue>(() => {
    const previousSteps =
      currentStep > 1 ? Array.from({ length: currentStep - 1 }, (_, i) => i + 1) : []

    return {
      currentStep,
      totalSteps,
      previousSteps,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === totalSteps,
      nextStep,
      previousStep,
      goToStep,
    }
  }, [currentStep, goToStep, nextStep, previousStep, totalSteps])

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  )
}

export function useMultiStepForm() {
  const context = useContext(MultiStepFormContext)

  if (!context) {
    throw new Error('useMultiStepForm must be used within a MultiStepFormProvider')
  }

  return context
}
