'use client'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { PlusIcon, DownloadIcon } from '@radix-ui/react-icons'

interface ODActionsProps {
  nameFilter: string
  setNameFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  handleExport: () => void
  path: string
}

export default function ODActions({
  nameFilter,
  setNameFilter,
  statusFilter,
  setStatusFilter,
  handleExport,
  path,
}: ODActionsProps) {
  return (
    <div className="mb-6 rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search Organization</label>
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
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`${path}/add`}
              className={buttonVariants({ variant: 'default', size: 'lg' })}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Organization
            </Link>
            <Button onClick={handleExport} variant="outline" size="lg">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
