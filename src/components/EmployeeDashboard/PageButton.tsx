'use client'

import { Button } from '@/components/ui/button'

interface PageButtonProps {
  label: string
  className?: string
  onClick?: () => void
}

export default function PageButton({
  label,
  className,
  onClick,
}: PageButtonProps) {
  return (
    <Button variant="outline" className={className} onClick={onClick}>
      {label}
    </Button>
  )
}
