import React from 'react'
import Link from 'next/link'
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
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'

interface TopicContentTableProps {
  contents: Content[]
  onCheckboxChange: (id: string) => void
}

const TopicContentTable: React.FC<TopicContentTableProps> = ({
  contents,
  onCheckboxChange,
}) => {
  const path = usePathname()
  return (
    <Table className="w-full table-fixed border-gray-300">
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="w-1/4 border-b text-left">Status</TableHead>
          <TableHead className="order-b w-full text-left">Content</TableHead>
          <TableHead className="w-1/4 border-b text-left">Resource</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contents.map((content) => (
          <TableRow key={content.id} className="w-full">
            <TableCell className="border-b border-gray-200 text-left">
              <Checkbox
                checked={false}
                // onClick={() => onCheckboxChange(content.id)}
              />
            </TableCell>
            <TableCell className="border-b border-gray-200 text-left font-medium">
              {content.title}
            </TableCell>
            <TableCell className="flex items-center justify-end border-b border-gray-200">
              <Link href={`${path}/resource/${content.id}`} className="group">
                <ArrowTopRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-800" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TopicContentTable
