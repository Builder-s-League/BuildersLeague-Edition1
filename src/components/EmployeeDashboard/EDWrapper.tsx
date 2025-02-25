'use client'

import { useState } from 'react'
import EDActions from './EDActions'
import { Separator } from '@/components/ui/separator'
import EmployeeList from './EmployeeList'
import { Card } from '@/components/ui/card'
import { usePathname } from 'next/navigation'
import { Profile } from '@/types/profile'

interface EDWrapperProps {
  employees: Profile[]
  hrId: string
}

export default function EDWrapper({ employees, hrId }: EDWrapperProps) {
  const [nameFilter, setNameFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const path = usePathname()

  // Apply filters
  const filteredEmployees = employees.filter((emp) => {
    // Name filter - case insensitive
    const nameMatch = emp.name.toLowerCase().includes(nameFilter.toLowerCase())

    // Status filter
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'active' && emp.is_active) ||
      (statusFilter === 'inactive' && !emp.is_active)

    return nameMatch && statusMatch
  })

  const totalEmployees = filteredEmployees.length

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Employee Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your employees and their information
          </p>
        </div>

        <Card className="flex items-center justify-center p-4 sm:p-6">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Total Employees</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {totalEmployees}
            </p>
          </div>
        </Card>
      </div>

      <EDActions
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        path={path}
        hrId={hrId}
      />

      <Separator className="my-4" />

      <div className="rounded-lg border bg-white shadow">
        <div className="p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Employee List
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {totalEmployees === 0
                  ? 'No employees found'
                  : `Showing ${totalEmployees} employee${totalEmployees === 1 ? '' : 's'}`}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {filteredEmployees.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No employees match your search criteria
              </div>
            ) : (
              <EmployeeList employees={filteredEmployees} hrId={hrId} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
