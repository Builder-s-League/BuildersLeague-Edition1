'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface ConfirmationDialogProps {
  trigger: ReactNode
  title: string
  description: string
  actionLabel: string
  cancelLabel?: string
  onConfirm: () => Promise<void>
  isLoading?: boolean
  variant?: 'default' | 'destructive'
}

export default function ConfirmationDialog({
  trigger,
  title,
  description,
  actionLabel,
  cancelLabel = 'Cancel',
  onConfirm,
  isLoading = false,
  variant = 'default',
}: ConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
            className={
              variant === 'destructive' ? 'bg-red-500 hover:bg-red-600' : ''
            }
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
