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
} from '@/components/ui/alert-dialog'
import { Check, X } from 'lucide-react'
import Image from 'next/image'

interface ImagePreviewModalProps {
  onReset: () => void
  onConfirm: () => void
  imageURL: string | null
  isLoading?: boolean
  isOpen: boolean
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  onReset,
  imageURL,
  onConfirm,
  isLoading = false,
  isOpen,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onReset()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Preview Profile Photo
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Make sure your photo is clear and centered
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-6">
          <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full bg-gray-100 ring-2 ring-gray-200">
            {imageURL ? (
              <Image
                src={imageURL}
                alt="Profile preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 192px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-gray-400">No image selected</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          Supported formats: JPG, PNG, GIF, WEBP
          <br />
          Maximum file size: 5MB
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onReset}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              onConfirm()
            }}
            className="flex items-center gap-2"
            disabled={isLoading || !imageURL}
          >
            <Check className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ImagePreviewModal
