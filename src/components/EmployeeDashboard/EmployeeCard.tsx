'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '../ui/confirmation-dialog'
import { toast } from 'sonner'
import { ProfileSummary } from '@/types/profile'
import { cn } from '@/utils/tailwind'
import { deleteEmployee } from '@/actions/employee-action'

interface EmployeeCardProps {
  profile: ProfileSummary
  learningHours: number
  hrId: string
}

export default function EmployeeCard({
  profile,
  learningHours,
  hrId,
}: EmployeeCardProps) {
  const router = useRouter()
  const path = usePathname()

  const handleDelete = async () => {
    try {
      await deleteEmployee(profile.id, hrId)
      toast.success('Employee deleted successfully')
    } catch (error) {
      console.error('Error deleting employee:', error)
      toast.error('Failed to delete employee')
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="p-4 md:p-5">
        <div className="mb-3 md:mb-4">
          <div className="flex items-center gap-4">
            <h3 className="truncate text-base font-semibold text-gray-900 md:text-lg">
              {profile.name}
            </h3>
            <span
              className={cn(
                'inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium',
                profile.is_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700',
              )}
            >
              {profile.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            Employee ID: {profile.id}
          </p>
        </div>

        <div className="mb-3 md:mb-4">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800 md:px-3 md:py-1 md:text-sm">
            Learning Hours: {learningHours}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="md:size-default flex-1"
            onClick={() => router.push(`${path}/edit/${profile.id}`)}
          >
            Edit
          </Button>
          <ConfirmationDialog
            title="Are you sure?"
            description="This action cannot be undone."
            actionLabel="Delete"
            variant="destructive"
            cancelLabel="Cancel"
            onConfirm={handleDelete}
            trigger={
              <Button
                variant="destructive"
                size="sm"
                className="md:size-default flex-1"
              >
                Delete
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}
