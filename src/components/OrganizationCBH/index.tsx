import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { OrganizationType } from './type'

type Props = {
  org: OrganizationType
}

export default function OrganizationCBH({ org }: Props) {
  return (
    <div key={org.id} className="mb-4 grid grid-cols-4 gap-4">
      <div className="relative col-span-3 flex flex-col justify-between rounded border p-4">
        <span className="absolute inset-0 flex items-center justify-center text-lg">
          {org.name}
        </span>
        <span
          className={`mt-auto self-end text-sm ${org.is_active ? 'text-green-500' : 'text-gray-500'}`}
        >
          {org.is_active ? 'active' : 'inactive'}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href={`/cbh/organization-dashboard/edit/${org.id}`}
          className={buttonVariants({ variant: 'default' })}
        >
          Edit Org
        </Link>
        <Link
          href="/cbh/employee"
          className={buttonVariants({ variant: 'secondary' })}
        >
          Edit Members
        </Link>
      </div>
    </div>
  )
}
