'use server'

import { mockTopics } from '@/mocks/topic'
import { Topic } from '@/types/topic'
import { API_URL } from '@/utils/constants'

export const getTopicDetail = async ({
  id,
}: {
  id: string
}): Promise<Topic> => {
  const response = await fetch(`${process.env.BASE_API_URL}/topic?id=${id}`, {
    next: {
      revalidate: 600,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }
  return await response.json()
}
