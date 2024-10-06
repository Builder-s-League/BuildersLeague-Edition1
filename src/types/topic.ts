import { Content } from './content'

export type Topic = {
  id: number
  title: string
  contents: Content[]
  progress: number
}
