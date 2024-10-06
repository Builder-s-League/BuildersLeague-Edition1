'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const supabase = createBrowserClient() // Initialize the browser client

      // Fetch the public URL for the video from Supabase Storage
      const { data } = supabase.storage
        .from('CHB_Videos') // Replace with your Supabase bucket name
        .getPublicUrl('sample-2.mp4') // Replace with your video file path

      console.log('Public URL:', data?.publicUrl) // Log the URL

      if (data?.publicUrl) {
        setVideoUrl(data.publicUrl) // Set the video URL from the Supabase storage
      }
    }

    fetchVideoUrl()
  }, [])

  return (
    <div className="flex h-screen items-center justify-center text-center">
      {videoUrl ? (
        <video width="600" controls autoPlay muted>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  )
}

export default VideoPlayer
