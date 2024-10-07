'use server'

import { mockTopics } from '@/mocks/topic'
import { Topic } from '@/types/topic'
import { API_URL } from '@/utils/constants'

export const getTopicDetail = async ({
  id,
}: {
  id: string
}): Promise<Topic> => {
  const response = await fetch(`${API_URL}/api/topic?id=${id}`, {
    next: {
      revalidate: 600,
    },
  })

  if (!response.ok) {
    console.log(response)
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }
  return await response.json()
}
