'use client'

import { createContext, useState, useContext } from 'react'

type RenderContextType = {
  hasRendered: boolean | null
  setHasRendered: (flag: boolean) => void
}

export const RenderContext = createContext<RenderContextType>({
  hasRendered: null,
  setHasRendered: () => {},
})

export const RenderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasRendered, setHasRendered] = useState<boolean | null>(null)

  const setHasRenderedFunc = (flag: boolean) => {
    setHasRendered(flag)
  }

  return (
    <RenderContext.Provider
      value={{ hasRendered, setHasRendered: setHasRenderedFunc }}
    >
      {children}
    </RenderContext.Provider>
  )
}

export const useRenderContext = () => useContext(RenderContext)
