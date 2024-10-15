'use client'

import LinearProgressBar from '@/components/LinearProgressBar'
import TopicContentTable from '@/components/TopicContentTableList'

import { Topic } from '@/types/topic'
import Image from 'next/image'
import { useState } from 'react'

interface TopicDetailPageProps {
  topic: Topic
}

export default function TopicDetailPageContent({
  topic,
}: TopicDetailPageProps) {
  const [topicState, setTopic] = useState<Topic>(topic)

  const handleCheckboxChange = (id: string) => {
    const updatedContents = topicState.content.map((content) =>
      content.id === id ? { ...content, status: false } : content,
    )
    const completedTasks = updatedContents.filter((content) => false).length
    const progress = Math.round((completedTasks / updatedContents.length) * 100)
    setTopic({ ...topicState, content: updatedContents, progress })
  }

  return (
    <div className="flex w-full flex-col">
      <div className="h-60 w-full">
        <Image
          src={topicState.image.url}
          alt={topicState.image.alt}
          width={1920}
          height={400}
          className="block h-full w-full object-cover"
        />
      </div>
      <section className="mb-4 p-4 text-left">
        <h1 className="mb-4 text-2xl font-bold">{topicState.title}</h1>
        <p className="text-muted-foreground">{topicState.description}</p>
      </section>
      <section className="mb-4 flex w-full flex-col px-4">
        <h2 className="mb-4 text-lg font-bold">Progress</h2>
        <div className="flex w-full flex-col">
          <LinearProgressBar value={topicState.progress} max={100} />
          <p className="text-right text-muted-foreground">
            {topicState.progress}%
          </p>
        </div>
      </section>
      <section className="flex w-full flex-col">
        <h2 className="mb-4 px-4 text-lg font-bold">Contents</h2>
        <TopicContentTable
          contents={topicState.content}
          onCheckboxChange={handleCheckboxChange}
        />
      </section>
    </div>
  )
}
