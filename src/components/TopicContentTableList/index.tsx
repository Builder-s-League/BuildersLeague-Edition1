import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Content } from '@/types/content'

interface TopicContentTableProps {
  contents: Content[]
  onCheckboxChange: (id: number) => void
}

const TopicContentTable: React.FC<TopicContentTableProps> = ({
  contents,
  onCheckboxChange,
}) => {
  return (
    <Table className="w-full table-fixed border-gray-300">
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="order-b w-full text-left">Content</TableHead>
          <TableHead className="w-1/4 border-b text-left">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contents.map((content) => (
          <TableRow key={content.id} className="w-full">
            <TableCell className="border-b border-gray-200 text-left font-medium">
              {content.title}
            </TableCell>
            <TableCell className="border-b border-gray-200 text-left">
              <Checkbox
                checked={content.status}
                onClick={() => onCheckboxChange(content.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TopicContentTable
