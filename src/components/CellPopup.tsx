import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface CellPopupProps {
  content: string
  children: React.ReactNode
}

const CellPopup: React.FC<CellPopupProps> = ({ content, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[80vw] overflow-auto">
        <p>{content}</p>
      </DialogContent>
    </Dialog>
  )
}

export default CellPopup
