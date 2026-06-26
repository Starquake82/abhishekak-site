'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

interface PreloaderContextType {
  isComplete: boolean
  setComplete: () => void
}

export const PreloaderContext = createContext<PreloaderContextType>({
  isComplete: false,
  setComplete: () => {},
})

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isComplete, setIsComplete] = useState(false)
  return (
    <PreloaderContext.Provider value={{ isComplete, setComplete: () => setIsComplete(true) }}>
      {children}
    </PreloaderContext.Provider>
  )
}

export const usePreloader = () => useContext(PreloaderContext)
