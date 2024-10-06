'use client'

import LinearProgressBar from '@/components/LinearProgressBar'
import TopicContentTable from '@/components/TopicContentTableList'
import TopicDetailItem from '@/components/TopicDetailItem'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockTopic as topicMock } from '@/mocks/topic'
import { Topic } from '@/types/topic'
import { useState } from 'react'

interface TopicDetailPageProps {
  params: {
    id: string
  }
}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const [topic, setTopic] = useState<Topic>(topicMock)

  const handleCheckboxChange = (id: number) => {
    const updatedContents = topic.contents.map((content) =>
      content.id === id ? { ...content, status: !content.status } : content,
    )
    const completedTasks = updatedContents.filter(
      (content) => content.status,
    ).length
    const progress = Math.round((completedTasks / updatedContents.length) * 100)
    setTopic({ ...topic, contents: updatedContents, progress })
  }

  return (
    <div className="flex w-full flex-col">
      <div className="h-40">
        <nav className="flex w-full flex-row justify-between">  {/* Hamburguer Button*/}
          <button className="w-8 h-8 flex justify-around flex-col flex-nowrap z-10" >
            <div className="w-8 h-1 rounded-lg bg-white"></div>
            <div className="w-8 h-1 rounded-lg bg-white"></div>
            <div className="w-8 h-1 rounded-lg bg-white"></div>
          </button>
          <button>Feedback</button>
        </nav>
      </div>
      <div className="flex w-full flex-col items-center">
        <LinearProgressBar value={topic.progress} max={100} />
        <p>{topic.progress}%</p>
      </div>
      <TopicContentTable
        contents={topic.contents}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  )
}
