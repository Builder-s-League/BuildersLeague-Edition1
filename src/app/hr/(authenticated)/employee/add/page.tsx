'use client'

import { addEmployee } from '@/actions/employee-action'
import AddEmployeeForm from '@/components/EmployeeDashboard/AddEmployeeForm'
import { createBrowserClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

export default function AddNewEmployeePage() {
  const router = useRouter()

  const handleSubmit = async (employeeData: any) => {
    const supabase = createBrowserClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'Not authenticated' }
    }
    const result = await addEmployee(employeeData, user.id)
    if (!result.error) {
      router.replace(`/hr/employee`)
    }
    return result
  }

  return <AddEmployeeForm onSubmit={handleSubmit} />
}
