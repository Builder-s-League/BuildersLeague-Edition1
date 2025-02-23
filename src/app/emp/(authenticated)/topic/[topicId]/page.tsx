import { getTopicDetail } from '@/services/getTopicDetail'
import TopicDetailPageContent from './_page'

interface TopicDetailPageProps {
  params: {
    topicId: string
  }
}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const response = await getTopicDetail({ id: params.topicId })

  return <TopicDetailPageContent topic={response} />
}
