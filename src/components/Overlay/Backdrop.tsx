import { ReactNode } from 'react'

const Backdrop: React.FC<{
  backdrop?: string
  reset: () => void
  children?: ReactNode
}> = ({ backdrop, children }) => {
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-full bg-black opacity-50 blur-sm ${backdrop}`}
      />
      {children}
    </>
  )
}

export default Backdrop
