'use client'

import Link from 'next/link'
import { useState } from 'react'
import VideoEmbed from '@/components/VideoEmbed'

export default function AboutPage() {
  const [showVideo, setShowVideo] = useState(true)

  return (
    <div className="flex min-h-screen w-full flex-col bg-black p-8 text-white">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white">
        Logo
      </div>
      <div className="flex flex-1 flex-col items-center justify-center space-y-8">
        <h1 className="text-center text-3xl font-bold">About</h1>
        <p className="mb-2 max-w-2xl text-center text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          architecto laborum mollitia debitis rerum totam, aperiam blanditiis,
          ducimus repellat, neque non obcaecati aliquam quisquam dolores. Totam
          quod cupiditate non quis?
        </p>
        <Link href="/tour">
          <button className="rounded border border-white px-4 py-2 transition-colors hover:bg-white hover:text-black">
            Help / App Tour
          </button>
        </Link>
        {showVideo && (
          <div className="w-full max-w-6xl">
            <VideoEmbed
              videoId="your-video-id"
              title="App Tour Video"
              onClose={() => setShowVideo(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
