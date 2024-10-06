'use client'
import { useEffect, useRef } from 'react'
import MainDashboard from './MainDashboard'
import VideoTour from './VideoTour'
import { useRenderContext } from '@/providers/RenderProvider'
import React from 'react'

const InitialScreen: React.FC<{ isSupabaseConnected: boolean }> = ({
  isSupabaseConnected,
}) => {
  const { hasRendered, setHasRendered } = useRenderContext()

  const finishTour = () => {
    setHasRendered(true)
  }

  return hasRendered ? (
    <MainDashboard isSupabaseConnected={isSupabaseConnected} />
  ) : (
    <VideoTour finishTour={finishTour} />
  )
}

export default React.memo(InitialScreen)
