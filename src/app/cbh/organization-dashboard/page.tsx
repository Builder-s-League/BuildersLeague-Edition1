'use client'
import React from 'react'
import { redirect } from 'next/navigation'
import OrganizationCBH from '@/components/OrganizationCBH'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'

const orgData = [
  {
    name: 'Org 1',
    address: 'Adresss 1',
    contactInfo: '123-123-1234',
    hrName: 'John Doe',
    hrEmail: 'john.doe@gmail.com',
  },
  {
    name: 'Org 2',
    address: 'Adresss 1',
    contactInfo: '123-123-1234',
    hrName: 'John Doe',
    hrEmail: 'john.doe@gmail.com',
  },
  {
    name: 'Org 3',
    address: 'Adresss 1',
    contactInfo: '123-123-1234',
    hrName: 'John Doe',
    hrEmail: 'john.doe@gmail.com',
  },
]

export default function OrgDashboard() {
  const allowedUser = 'CBH'
  const currentUser = 'CBH'
  if (currentUser != allowedUser) {
    redirect('/')
  }
  const path = usePathname()

  return (
    <div className="container mx-auto p-6">
      <div className="mb-3 grid grid-flow-col grid-cols-3 gap-4">
        <Input
          type="text"
          className="col-span-2"
          placeholder="Search organization..."
        />
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`${path}/add`}
            className={buttonVariants({ variant: 'default' })}
          >
            Add
          </Link>
          <Link href="#" className={buttonVariants({ variant: 'secondary' })}>
            Export
          </Link>
        </div>
      </div>

      {orgData.map((org, idx) => (
        <OrganizationCBH key={idx} idx={idx} org={org} />
      ))}

      <OrganizationCBHFooter />
    </div>
  )
}
