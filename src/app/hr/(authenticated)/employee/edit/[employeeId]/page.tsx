'use client'

import { useState, useEffect } from 'react'
import { useRouter, notFound } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'
import {
  getEmployeeDetails,
  updateEmployee,
  resetEmployeePassword,
} from '@/actions/employee-action'
import EditEmployeeForm from '@/components/EmployeeDashboard/EditEmployeeForm'
import { ProfileUpdate } from '@/types/profile'

export default function EditEmployeePage({
  params: { employeeId },
}: {
  params: { employeeId: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState(null)
  const [hrId, setHrId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const supabase = createBrowserClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return notFound()
        setHrId(user.id)

        const data = await getEmployeeDetails(employeeId, user.id)
        setEmployee(data)
      } catch (err) {
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [employeeId])

  if (loading || !employee || !hrId) {
    return <div>Loading...</div>
  }

  return (
    <EditEmployeeForm
      employee={employee}
      onSubmit={async (data) => {
        const result = await updateEmployee(
          employeeId,
          data as ProfileUpdate,
          hrId,
        )
        if (!result.error) {
          router.replace('/hr/employee')
        }
        return result
      }}
      onResetPassword={async (password) => {
        return resetEmployeePassword(employeeId, password)
      }}
    />
  )
}
