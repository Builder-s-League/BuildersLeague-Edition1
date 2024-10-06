import { ReactNode, useEffect } from 'react'
import Backdrop from './Backdrop'

const Modal: React.FC<{
  backdrop?: string
  modal: string
  reset: () => void
  children: ReactNode
}> = ({ backdrop, modal, reset, children }) => {
  useEffect(() => {
    const rootElement = document.body
    rootElement?.classList.add('no-scroll')

    return () => {
      //Cleanup function will run when component unmount.
      rootElement?.classList.remove('no-scroll')
    }
  }, []) // Empty dependency array to run the effect only once

  return (
    <>
      <Backdrop reset={reset} backdrop={backdrop} />

      {/* We need to specify the position of modal first in the component where we are using this modal*/}
      <div className={`fixed z-20 bg-slate-100 shadow-md ${modal}`}>
        {children}
      </div>
    </>
  )
}

export default Modal
