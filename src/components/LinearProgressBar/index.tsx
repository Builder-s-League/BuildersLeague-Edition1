'use client'

import { useState } from 'react'
import { Progress } from '../ui/progress'

interface LinearProgressBarProps {
  value: number
  max: number
}

export default function LinearProgressBar({
  value,
  max,
}: LinearProgressBarProps) {
  return <Progress value={value} max={max} className="h-8 rounded-none" />
}
