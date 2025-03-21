'use client'
import { importEmployees } from '@/actions/employee-action'
import ImportEmployeeForm from '@/components/EmployeeDashboard/ImportEmployeeForm'
import { toast } from 'sonner'
import { ProfileCreate } from '@/types/profile'
import { useRouter } from 'next/navigation'

export default function ImportEmployeePage({
  params: { hrId },
}: {
  params: { hrId: string }
}) {
  const router = useRouter()
  const handleImport = async (data: ProfileCreate[]) => {
    try {
      const route = `/cbh/organization-dashboard/${hrId}`
      await importEmployees(data, hrId, route)
      toast.success('Employees imported successfully')
      router.replace(route)
    } catch (error) {
      toast.error('Failed to import employees')
      throw error // This will be caught by the form component
    }
  }

  return (
    <ImportEmployeeForm
      onSubmit={async (data) => {
        await handleImport(data)
      }}
    />
  )
}
