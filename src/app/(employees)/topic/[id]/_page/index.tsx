'use client'

import LinearProgressBar from '@/components/LinearProgressBar'
import TopicContentTable from '@/components/TopicContentTableList'

import { Topic } from '@/types/topic'
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
      <div className="flex w-full flex-col items-center">
        <LinearProgressBar value={topicState.progress} max={100} />
        <p>{topicState.progress}%</p>
      </div>
      <TopicContentTable
        contents={topicState.content}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  )
}
