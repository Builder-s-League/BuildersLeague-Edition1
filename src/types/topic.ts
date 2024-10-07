import { Content } from './content'

export type Image = {
  id: string
  alt: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  createdAt: string
  updatedAt: string
  url: string
}

export type Topic = {
  id: string
  title: string
  description: string
  image: Image
  createdAt: string
  updatedAt: string
  content: Content[]
  progress: number
}

export type TopicShort = {
  id: string
  title: string
  description: string
  contentsQuantity: number
  progress: number
}
