'use client'
import { Profile } from '@/types/profile'
import EDWrapper from './EDWrapper'

interface EmployeeDashboardProps {
  employees: Profile[]
  hrId: string
}

export default function EmployeeDashboard({
  employees,
  hrId,
}: EmployeeDashboardProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-7xl">
        <EDWrapper employees={employees} hrId={hrId} />
      </div>
    </div>
  )
}
