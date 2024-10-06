import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import fetchMediaFromSupabase from '@/utils/supra-media'

const VideoPreview: React.FC<{
  sectionToggle: () => void
}> = ({ sectionToggle }) => {
  const [videoContent, setVideoContent] = useState<null | string>(null)
  const [loading, setLoading] = useState(true) // Loading state

  useEffect(() => {
    // Fetch video content when the component mounts
    const getVideoContent = async () => {
      const data = await fetchMediaFromSupabase(
        'CBH_video',
        'sample-video.mp4',
        'video',
      )
      setVideoContent(data)
      setLoading(false)
    }

    getVideoContent()
  }, [])

  return (
    <div className="relative m-4 flex w-full flex-col items-start gap-3 bg-green-500">
      {loading ? (
        <div className="h-[14rem] w-full animate-pulse rounded-md bg-gray-300" />
      ) : (
        videoContent && (
          <video
            src={videoContent}
            className="h-[14rem] w-full bg-white"
            controls
          />
        )
      )}

      <Button className="absolute -bottom-12 right-0" onClick={sectionToggle}>
        Back
      </Button>
    </div>
  )
}

export default VideoPreview
