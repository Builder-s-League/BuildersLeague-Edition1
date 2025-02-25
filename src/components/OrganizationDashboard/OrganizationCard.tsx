import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/utils/tailwind'
import { PencilIcon, UsersIcon } from 'lucide-react'
import { ProfileSummary } from '@/types/profile'

type Props = {
  org: ProfileSummary
}

export default function OrganizationCard({ org }: Props) {
  return (
    <div className="group rounded-lg border bg-card transition-colors hover:bg-accent/10">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center  gap-4 ">
              <h3 className="text-xl font-semibold">{org.name}</h3>
              <span
                className={cn(
                  'inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium',
                  org.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700',
                )}
              >
                {org.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Organization ID: {org.id}
            </p>
            <p className="text-sm text-muted-foreground">
              Contact Info: {org.contact_info}
            </p>
            <p className="text-sm text-muted-foreground">Email: {org.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={`/cbh/organization-dashboard/edit/${org.id}`}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'flex w-full items-center justify-center gap-2',
            )}
          >
            <PencilIcon className="h-4 w-4" />
            Edit Organization
          </Link>
          <Link
            href={`/cbh/organization-dashboard/${org.id}`}
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'flex w-full items-center justify-center gap-2',
            )}
          >
            <UsersIcon className="h-4 w-4" />
            Manage Members
          </Link>
        </div>
      </div>
    </div>
  )
}
