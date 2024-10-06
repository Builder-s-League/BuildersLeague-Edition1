'use client'

import { Progress } from '@/components/ui/progress'

interface LinearProgressBarProps {
  value: number
  max: number
}

export default function LinearProgressBar({
  value,
  max,
}: LinearProgressBarProps) {
  const percentage = Math.round((value / max) * 100)
  return (
    <div className="w-full space-y-2">
      <Progress value={percentage} className="w-full" />
      <p className="w-full text-center text-sm text-muted-foreground">
        {percentage}% completed
      </p>
    </div>
  )
}
