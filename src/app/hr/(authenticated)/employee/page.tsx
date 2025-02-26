import React from 'react'
import EmployeeDashboard from '@/components/EmployeeDashboard'
import { getEmployeesAsHR } from '@/actions/employee-action'

export default async function EmployeePage() {
  const { employees, hrId, error } = await getEmployeesAsHR()

  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return <EmployeeDashboard employees={employees} hrId={hrId} />
}
