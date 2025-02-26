'use client'
import { importEmployees } from '@/actions/employee-action'
import ImportEmployeeForm from '@/components/EmployeeDashboard/ImportEmployeeForm'
import { ProfileCreate } from '@/types/profile'
import { createBrowserClient } from '@/utils/supabase'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ImportEmployeePage() {
  const router = useRouter()
  const handleImport = async (data: ProfileCreate[]) => {
    try {
      // Your import logic here
      // Example:
      const supabase = createBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'Not authenticated' }
      }
      await importEmployees(data, user.id, '/hr/employee')
      router.replace('/hr/employee')
      toast.success('Employees imported successfully')
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
