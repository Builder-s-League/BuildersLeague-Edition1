import PostCard, { Post } from '@/components/PostCard'
import { Button } from '@/components/ui/button'

export default function Page() {
  const list: Post[] = [
    {
      username: 'Alice Johnson',
      content: 'Just finished reading an amazing book!',
      likes: 25,
      link: {
        id: 101,
        title: 'Book Review: The Great Gatsby',
        href: 'https://example.com/book-review-gatsby',
        content: 'A detailed review of The Great Gatsby.',
      },
    },
    {
      username: 'Bob Smith',
      content: 'Check out this awesome tutorial on React!',
      likes: 15,
      link: {
        id: 102,
        title: 'React Tutorial',
        href: 'https://example.com/react-tutorial',
        content: 'Learn React step-by-step with this tutorial.',
      },
    },
    {
      username: 'Charlie Brown',
      content: 'Had a great time hiking this weekend!',
      likes: 30,
      link: {
        id: 103,
        title: 'Hiking Adventures',
        href: 'https://example.com/hiking-adventures',
        content: 'Photos and stories from my recent hiking trip.',
      },
    },
    {
      username: 'Diana Prince',
      content: 'Exploring the world of AI and machine learning.',
      likes: 20,
      link: {
        id: 104,
        title: 'AI and Machine Learning',
        href: 'https://example.com/ai-ml',
        content: 'An introduction to AI and machine learning concepts.',
      },
    },
    {
      username: 'Eve Adams',
      content: 'Just baked some delicious cookies!',
      likes: 18,
      link: {
        id: 105,
        title: 'Cookie Recipe',
        href: 'https://example.com/cookie-recipe',
        content: 'A simple and tasty cookie recipe.',
      },
    },
  ]

  return (
    <div className="mb-56 flex h-screen w-full flex-col p-4">
      <div className="mb-4 flex flex-row justify-end gap-4">
        <Button>Share a note</Button>
        <Button variant={'outline'}>Share an article</Button>
      </div>
      <div className="flex flex-col items-center gap-4 ">
        {list.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  )
}
