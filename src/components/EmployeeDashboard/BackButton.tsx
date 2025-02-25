'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="hidden sm:inline">Back</span>
    </Button>
  )
}
