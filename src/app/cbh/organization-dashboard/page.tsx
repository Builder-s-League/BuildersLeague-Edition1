'use client'
import React, { useState, useEffect } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import OrganizationCBH from '@/components/OrganizationCBH'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'

export default function OrgDashboard() {
  const [orgData, setOrgData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const path = usePathname()
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, contact_info, isactive')
          .eq('role', 1)

        if (error) throw error

        setOrgData(data || [])
      } catch (err) {
        console.error('Error fetching organizations:', err)
        setError('Failed to fetch organizations')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

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
        <OrganizationCBH key={idx} org={org} />
      ))}

      <OrganizationCBHFooter />
    </div>
  )
}
