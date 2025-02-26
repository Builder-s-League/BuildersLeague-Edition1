'use client'
import React, { useState, useEffect, useRef } from 'react'
import MenuDrawer from '@/components/MenuDrawer'
import Image from 'next/image'
import ResourceContentTooltip from '@/components/ResourceContentTip'
import { ResourceAddNote } from '@/components/ResourceAddNote'
import RichTextRenderer from '@/components/RichText'
import { useParams } from 'next/navigation'

type Filetype = 'image' | 'video' | 'audio'

interface ResourcePageProps {
  params: {
    resourceId: string
  }
}
export default function ResourcePage() {
  const params = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(null)
  const [links, setLinks] = useState<[] | null>(null)
  const [selectedFileType, setSelectedFileType] = useState<Filetype>('video')
  const [activateNoteArea, setActivateNoteArea] = useState(1)

  async function fetchResourceContent() {
    const data = await fetch(
      'http://localhost:3001/api/topic/resource?id=' + params.resourceId,
      {
        cache: 'no-cache',
      },
    )
    const res = await data.json()
    setContent(res.content)
    setTitle(res.title)

    setLinks(res.links)
  }
  useEffect(() => {
    fetchResourceContent()
  }, [])
  return (
    <div className="container">
      <div className="mx-auto flex flex-col items-start justify-center gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
        {content && (
          <Content
            selectedFileType={selectedFileType}
            setActivateNoteArea={setActivateNoteArea}
            content={content}
            title={title}
            links={links}
          />
        )}
        <ResourceAddNote activateNoteArea={activateNoteArea} />
      </div>
    </div>
  )
}

const Content = ({
  title,
  selectedFileType,
  setActivateNoteArea,
  content,
  links,
}: {
  title: string
  content: any
  links: [] | null
  setActivateNoteArea: any
  selectedFileType: Filetype
}) => {
  return (
    <div className="mx-auto  flex w-full flex-col items-center justify-center gap-10   py-8  md:py-12 md:pb-8 lg:py-12 lg:pb-10">
      <Title title={title} />

      <Description text={content} setActivateNoteArea={setActivateNoteArea} />

      <div>
        <div className="text-slate-400">Attached Video</div>
        <File type={selectedFileType} />
      </div>
      <div className="w-full">
        <div className="text-slate-400">Attached Links</div>{' '}
        {links && (
          <>
            {links.map((l: { id: string; link: string }, i) => {
              return (
                <div key={l.id}>
                  <a
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-blue-500 underline hover:text-blue-700"
                  >
                    Link {i + 1}
                  </a>
                  <br />
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

const Description = ({
  text,
  setActivateNoteArea,
}: {
  setActivateNoteArea: any
  text: any
}) => {
  const contentRef = useRef(null)
  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      setActivateNoteArea((prev: number) => prev + 1)
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      ref={contentRef}
      onMouseDown={() => setActivateNoteArea((prev: number) => prev + 1)}
      onMouseUp={() => setActivateNoteArea((prev: number) => prev + 1)}
    >
      {text && <RichTextRenderer content={text} />}

      <ResourceContentTooltip
        contentRef={contentRef}
        setActivateNoteArea={setActivateNoteArea}
      />
    </div>
  )
}
const PlayAudio = ({ text }: { text: string }) => {
  const [playing, setPlaying] = useState<boolean>(false)

  const handleAudio = () => setPlaying(!playing)

  useEffect(() => {
    if (playing) {
      if (text.trim() === '') return
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
    } else {
      window.speechSynthesis.cancel()
    }
  }, [playing, text])

  return (
    <div
      className="relative flex h-10 w-1/2 justify-between rounded-xl border p-2"
      onClick={handleAudio}
    >
      <div>{playing ? 'Stop' : 'Play'} audio</div>
      <AudioIcon playing={playing} />
    </div>
  )
}

const AudioIcon = ({ playing }: { playing: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="absolute right-3 top-3 h-4 w-4 text-slate-500"
  >
    {playing ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    )}
  </svg>
)

const File = ({ type }: { type: Filetype }) => {
  switch (type) {
    case 'image':
      return (
        <figure className="max-w-lg">
          <Image
            className="h-auto max-w-full rounded-lg"
            src="https://t3.ftcdn.net/jpg/07/02/44/70/240_F_702447075_0ZdExxmdIZrZezTiSn9YhIzu0ADh98h6.jpg"
            alt="Image description"
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Image caption
          </figcaption>
        </figure>
      )
    case 'video':
      return (
        <video className="h-full w-full rounded-lg" controls>
          <source
            src="https://docs.material-tailwind.com/demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )
    case 'audio':
      return (
        <audio className="w-full" controls>
          <source src="https://www.example.com/audio.mp3" type="audio/mp3" />
          Your browser does not support the audio tag.
        </audio>
      )
    default:
      return null
  }
}

const Title = ({ title }: { title: string }) => (
  <div className="text-justify-center font-thik flex border-slate-400 text-3xl capitalize">
    {title}
  </div>
)
