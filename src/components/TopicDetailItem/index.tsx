import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'

interface TopicDetailItemProps {
  title: string
  status: string
  link?: {
    href: string
    date?: Date
  }
}

export default function TopicDetailItem({
  title,
  status,
  link,
}: TopicDetailItemProps) {
  return (
    <div className="flex w-full flex-col items-center ">
      <div className="flex flex-row gap-4">
        <h3>{title}</h3>

        <Checkbox />
        <p>{status}</p>
      </div>
      {link && <div>{link.date && <p>{link.date.toLocaleString()}</p>}</div>}
    </div>
  )
}
