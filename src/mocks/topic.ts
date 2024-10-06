import { Topic } from '@/types/topic'

export const mockTopic: Topic = {
  id: 1,
  title: 'Topic 1',
  contents: [
    {
      id: 1,
      title: 'Article',
      status: true,
    },
    {
      id: 2,
      title: 'Video',
      status: false,
    },
    {
      id: 3,
      title: 'Quiz',
      status: false,
    },
  ],
  progress: 33,
}
