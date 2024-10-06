export interface Post {
  username: string
  content: string
  likes: number
  link?: {
    id?: number
    title: string
    href?: string
    content?: string
  }
}
interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex w-full flex-col">
      <label>{post.username}</label>
      <div>{post.content}</div>
      <div className="flex flex-row gap-4">
        {post.link?.id && <label>{post.link.id}</label>}
        {post.link?.content && <div>{post.link.content}</div>}
        {post.link && post.link.href && (
          <a href={post.link.href}>{post.link.title}</a>
        )}
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>{post.likes}</div>
        <div className="flex flex-row items-center gap-4">
          <button>Like</button>
          <button>Report</button>
        </div>
      </div>
    </div>
  )
}
