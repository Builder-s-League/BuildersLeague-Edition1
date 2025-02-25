'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExportCSVButton } from './ExportButton'
import {
  PlusIcon,
  DownloadIcon,
  UploadIcon,
  EnvelopeOpenIcon,
} from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface EDActionsProps {
  nameFilter: string
  setNameFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  path: string
  hrId: string
}

export default function EDActions({
  nameFilter,
  setNameFilter,
  statusFilter,
  setStatusFilter,
  path,
  hrId,
}: EDActionsProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search Employee</label>
          <Input
            type="text"
            placeholder="Filter by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Actions</label>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Link href={`${path}/add`} passHref>
                <Button className="w-full">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </Link>
              <Link href={`${path}/import`} passHref>
                <Button variant="outline" className="w-full">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link href={`${path}/email`} passHref>
                <Button variant="outline" className="w-full">
                  <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
                  Email All
                </Button>
              </Link>
              <ExportCSVButton hrId={hrId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
