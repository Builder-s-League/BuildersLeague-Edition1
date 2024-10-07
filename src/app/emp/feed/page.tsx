import PostCard, { Post } from '@/components/PostCard'

export default function Page() {
  // export interface Post {
  //     username: string;
  //     content: string;
  //     likes: number;
  //     link?: {
  //         title: string;
  //         href: string;
  //         content?: string;
  //     }

  // }
  const list: Post[] = [
    {
      username: 'John Doe',
      content: 'I love it...',
      likes: 10,
      link: {
        id: 1,
        title: 'Article 1',
        href: 'https://example.com/article1',
      },
    },
    {
      username: 'Jane Doe',
      content: 'I love it too...',
      likes: 5,
      link: {
        title: 'Article 2',
        href: 'https://example.com/article2',
        content: 'I love this article',
      },
    },
    {
      username: 'John Doe',
      content: 'I love it...',
      likes: 10,
      link: {
        title: 'Article 1',
        href: 'https://example.com/article1',
      },
    },
  ]

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex flex-row justify-end gap-4">
        <button>Share a note</button>
        <button>Share an article</button>
      </div>
      <div className="flex flex-col items-center gap-4 ">
        {list.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  )
}
