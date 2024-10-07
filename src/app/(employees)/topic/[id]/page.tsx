import { getTopicDetail } from '@/services/getTopicDetail'
import TopicDetailPageContent from './_page'

interface TopicDetailPageProps {
  params: {
    id: string
  }
}

export default async function TopicDetailPage({
  params,
}: TopicDetailPageProps) {
  const response = await getTopicDetail({ id: params.id })

  return <TopicDetailPageContent topic={response} />
}
