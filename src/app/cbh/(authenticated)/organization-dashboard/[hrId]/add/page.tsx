'use client'

import { useRouter } from 'next/navigation'
import { addEmployee } from '@/actions/employee-action'
import AddEmployeeForm from '@/components/EmployeeDashboard/AddEmployeeForm'

export default function AddEmployeePage({
  params: { hrId },
}: {
  params: { hrId: string }
}) {
  const router = useRouter()

  const handleSubmit = async (employeeData: any) => {
    const result = await addEmployee(employeeData, hrId)
    if (!result.error) {
      router.replace(`/cbh/organization-dashboard/${hrId}`)
    }
    return result
  }

  return <AddEmployeeForm onSubmit={handleSubmit} />
}
