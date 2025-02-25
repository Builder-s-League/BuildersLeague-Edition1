'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ProfileSummary } from '@/types/profile'
import { Card } from '@/components/ui/card'
import ODActions from './ODActions'
import OrganizationCBH from './OrganizationCard'

interface ODWrapperProps {
  organizations: ProfileSummary[]
}

export default function ODWrapper({ organizations }: ODWrapperProps) {
  const [nameFilter, setNameFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const path = usePathname()

  const filteredOrgData = organizations.filter((org) => {
    const nameMatch = org.name.toLowerCase().includes(nameFilter.toLowerCase())
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'active' && org.is_active) ||
      (statusFilter === 'inactive' && !org.is_active)
    return nameMatch && statusMatch
  })

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Contact Info', 'Status'],
      ...filteredOrgData.map((org) => [
        org.name,
        org.email,
        org.contact_info,
        org.is_active ? 'Active' : 'Inactive',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const fileName = `organizations-${new Date().toISOString().split('T')[0]}.csv`
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', fileName)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizations Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and monitor your organizations
          </p>
        </div>

        <Card className="flex items-center justify-center p-4 sm:p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              Total Organizations
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {filteredOrgData.length}
            </p>
          </div>
        </Card>
      </div>

      <ODActions
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        handleExport={handleExport}
        path={path}
      />

      <div className="space-y-4">
        {filteredOrgData.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-muted-foreground">
              No organizations found matching your filters
            </div>
          </div>
        ) : (
          filteredOrgData.map((org, idx) => (
            <OrganizationCBH key={idx} org={org} />
          ))
        )}
      </div>
    </>
  )
}
