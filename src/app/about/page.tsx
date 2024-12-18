'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'

export default function AboutPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = '//www.instagram.com/embed.js'
    document.body.appendChild(script)
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-white p-8">
      <div className="flex flex-col items-center space-y-6">
        <Image
          src="/cobh_logo/COBH_Logo_Large.svg"
          alt="Community of Big Hearts Logo"
          width={400}
          height={400}
        />

        <section className="mt-8 w-full max-w-2xl">
          <div className="flex aspect-video items-center justify-center rounded-lg">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/p/C-V_wdGx9gc/"
              data-instgrm-version="14"
              style={{ width: '100%' }}
            >
              <a href="https://www.instagram.com/p/C-V_wdGx9gc/">
                View this post on Instagram
              </a>
            </blockquote>
          </div>
        </section>
      </div>
    </div>
  )
}
