import React from 'react'
import { Button } from '../ui/button'
import { AlertTriangleIcon, Heart, ThumbsUp } from 'lucide-react'

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
    <div className="flex w-full flex-col justify-start rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col items-start gap-2">
          <div className=" text-lg font-bold text-gray-900">
            {post.username}
          </div>
          <div className="mb-4 text-gray-600">{post.content}</div>
        </div>
        <Button
          variant="outline"
          className="group hover:border-red-500 hover:bg-red-50 "
          size="icon"
        >
          <AlertTriangleIcon className="text-gray-400 group-hover:text-red-500" />
        </Button>
      </div>
      {post.link && (
        <div className="mb-4">
          {post.link.content && (
            <div className="text-sm text-gray-400">{post.link.content}</div>
          )}
          {post.link.href && (
            <a href={post.link.href} className="text-blue-500 hover:underline">
              {post.link.title}
            </a>
          )}
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="text-gray-400">{post.likes} likes</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <div className="flex items-center gap-1">
              <ThumbsUp size={16} />
              Like
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
