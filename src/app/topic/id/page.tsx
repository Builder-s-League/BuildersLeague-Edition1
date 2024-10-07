'use client'

import { Progress } from '@/components/ui/progress'
import TopicContentTable from '@/components/TopicContentTableList'
import { mockTopic as topicMock } from '@/mocks/topic'
import { Topic } from '@/types/topic'
import { useState, useEffect } from 'react'

export function getHeaderImage(
  topic: Topic,
  contentId: number,
): string | undefined {
  const content = topic.contents.find((item) => item.id === contentId)
  console.log('Content found:', content) // Log the found content
  return content ? content.header_image : undefined
}

interface TopicDetailPageProps {
  params: {
    id: string
  }
}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const [topic, setTopic] = useState<Topic>(topicMock)
  const [isOpen, setIsOpen] = useState<boolean>(false) // Add state for menu open/close

  // Effect to log topic on mount
  useEffect(() => {
    console.log('Initial Topic Mock:', topicMock)
    console.log('Initial Topic State:', topic)
  }, [])

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

  // Call getHeaderImage function with the topicMock
  const headerImage = getHeaderImage(topicMock, 1)
  console.log('Header Image:', headerImage)

  return (
    <div className="flex w-full flex-col">
      {/* Header Image Section */}
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        <nav className="flex w-full flex-row justify-between">
          {/* Hamburger Menu Button */}
          <button
            className="relative z-10 h-12 w-12 rounded-md bg-white p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <div className="flex h-full w-full flex-col items-center justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-out ${
                  isOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-out ${
                  isOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>

          {/* Circular Feedback Button */}
          <button
            className="h-24 w-24 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Provide feedback"
          >
            <span className="text-xs font-medium">Feedback</span>
          </button>
        </nav>
      </div>

      <div className="flex w-full flex-col items-center">
        {/* Replace LinearProgressBar with ShadCN Progress */}
        <Progress value={topic.progress} max={100} className="w-full" />
        <p>{topic.progress}%</p>
      </div>

      <TopicContentTable
        contents={topic.contents}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  )
}
