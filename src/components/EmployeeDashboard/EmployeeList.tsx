'use client'

import EmployeeCard from './EmployeeCard'
import { Profile } from '@/types/profile'

interface EmployeeListProps {
  employees: Profile[]
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center md:p-6 lg:p-8">
        <p className="text-gray-500">No employees found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} profile={employee} learningHours={0} />
      ))}
    </div>
  )
}
