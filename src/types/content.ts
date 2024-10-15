export type Link = {
  link: string
  id: string
}

export type ChildContent = {
  text: string
}

export type Content = {
  id: string
  title: string
  content: {
    children: ChildContent[]
  }[]
  date: string
  links?: Link[]
  image?: string
  video?: string
  createdAt: string
  updatedAt: string
}
