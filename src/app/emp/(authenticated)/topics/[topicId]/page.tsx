import TopicDetailPageContent from './_page'
import { Topic } from '@/types/topic'

interface TopicDetailPageProps {
  params: {
    topicId: string
  }
}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/topic?id=${{ id: params.topicId }}`,
    {
      next: {
        revalidate: 600,
      },
    },
  )
  const responseJson: Topic = await response.json()

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }

  return <TopicDetailPageContent topic={responseJson} />
}
