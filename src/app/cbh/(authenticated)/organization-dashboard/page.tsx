'use client'
import React, { useState, useEffect } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import OrganizationCBH from '@/components/OrganizationCBH'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function OrgDashboard() {
  const [orgData, setOrgData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nameFilter, setNameFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
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

  const filteredOrgData = orgData.filter((org) => {
    const nameMatch = org.name.toLowerCase().includes(nameFilter.toLowerCase())
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'active' && org.isactive) ||
      (statusFilter === 'inactive' && !org.isactive)
    return nameMatch && statusMatch
  })

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Contact Info', 'Status'],
      ...filteredOrgData.map((org) => [
        org.name,
        org.email,
        org.contact_info,
        org.isactive ? 'Active' : 'Inactive',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'organizations.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto p-6">
      <div className="mb-3 grid grid-cols-3 gap-4">
        <Input
          type="text"
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
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
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`${path}/add`}
            className={buttonVariants({ variant: 'default' })}
          >
            Add
          </Link>
          <Button
            onClick={handleExport}
            className={buttonVariants({ variant: 'secondary' })}
          >
            Export
          </Button>
        </div>
      </div>

      {filteredOrgData.map((org, idx) => (
        <OrganizationCBH key={idx} org={org} />
      ))}

      <OrganizationCBHFooter />
    </div>
  )
}
