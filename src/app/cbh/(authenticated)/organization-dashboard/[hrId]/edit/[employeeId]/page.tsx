'use client'

import { useState, useEffect } from 'react'
import { useRouter, notFound } from 'next/navigation'
import {
  getEmployeeDetails,
  resetEmployeePassword,
  updateEmployee,
} from '@/actions/employee-action'
import EditEmployeeForm from '@/components/EmployeeDashboard/EditEmployeeForm'

export default function EditEmployeePage({
  params: { employeeId, hrId },
}: {
  params: { employeeId: string; hrId: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const data = await getEmployeeDetails(employeeId, hrId)
        setEmployee(data)
      } catch (err) {
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [employeeId, hrId])

  if (loading || !employee) {
    return <div>Loading...</div>
  }

  return (
    <EditEmployeeForm
      employee={employee}
      onSubmit={async (data) => {
        const result = await updateEmployee(employeeId, data, hrId)
        if (!result.error) {
          router.replace(`/cbh/organization-dashboard/${hrId}`)
        }
        return result
      }}
      onResetPassword={async (password: string) => {
        return resetEmployeePassword(employeeId, password)
      }}
    />
  )
}
