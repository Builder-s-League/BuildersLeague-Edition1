// components/VideoTour.tsx
'use client' // Ensure this is a client component

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import fetchMediaFromSupabase from '@/utils/supra-media'

const VideoTour: React.FC<{ finishTour: () => void }> = ({ finishTour }) => {
  const [videoUrl, setVideoUrl] = useState<null | string>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)
        const data = await fetchMediaFromSupabase(
          'CBH_video',
          'sample-video.mp4',
          'video',
        )

        setVideoUrl(data)
      } catch (error) {
        console.error('Error fetching video:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [])

  return (
    <div className="relative h-[95vh] max-w-[375px]">
      <header className="flex items-center justify-center gap-[8rem] pt-4">
        <h2 className="text-center text-2xl font-medium">CBH Tour</h2>
        <Button onClick={finishTour}>Skip Tour</Button>
      </header>
      {loading ? (
        <div className="mt-[100px] h-[50%] w-[365px] animate-pulse bg-gray-400" />
      ) : videoUrl ? (
        <video
          src={videoUrl}
          className="mt-[100px] h-[50%] w-[365px]"
          controls
          autoPlay
          muted
        />
      ) : (
        <div className="mt-[150px] h-[220px] w-[340px] bg-gray-400" />
      )}
      <footer className="border-grey absolute bottom-12 ml-[50%] flex w-full -translate-x-[50%] justify-between gap-2 rounded-lg border-2 p-4">
        <Button>OM</Button>
        <Button>UGC</Button>
        <Button>C</Button>
        <Button>FB</Button>
        <Button>S</Button>
      </footer>
    </div>
  )
}

export default VideoTour
