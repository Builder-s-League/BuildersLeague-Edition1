import React from 'react'

interface VideoEmbedProps {
  videoId: string
  title: string
  onClose: () => void
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId, title, onClose }) => {
  return (
    <section className="relative">
      <div className="aspect-video w-full rounded border border-white p-4">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
        ></iframe>
      </div>
      <button
        onClick={onClose}
        className="absolute -top-2 right-2 rounded-full bg-white px-2 py-1 text-black"
      >
        ✕
      </button>
    </section>
  )
}

export default VideoEmbed
