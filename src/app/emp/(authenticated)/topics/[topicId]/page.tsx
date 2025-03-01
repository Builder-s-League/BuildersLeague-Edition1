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
  const id = { id: params.topicId }
  const apiUrl = process.env.CMS_API_URL

  const endpoint = `/topics/${id.id}?locale=undefined&draft=false&depth=1`
  const apiKey = process.env.CMS_API_KEY

  try {
    const response = await fetch(apiUrl + endpoint, {
      headers: {
        Authorization: `users API-Key ${apiKey}`,
      },
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    const data = await response.json()

    const responseData = {
      ...data,
      progress: 50,
    }

    console.log(responseData)

    return <TopicDetailPageContent topic={responseData} />
  } catch (error) {
    console.error(error)
    return { error: (error as Error).message }
  }
}
