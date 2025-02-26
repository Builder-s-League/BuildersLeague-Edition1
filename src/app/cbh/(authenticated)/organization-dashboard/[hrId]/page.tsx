import { notFound } from 'next/navigation'
import EmployeeDashboard from '@/components/EmployeeDashboard'
import { getEmployeesAsCBH } from '@/actions/employee-action'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function EmployeePage({
  params,
}: {
  params: { hrId: string }
}) {
  const { hrId } = params
  const { employees, error } = await getEmployeesAsCBH(hrId)

  if (error?.includes('Insufficient permissions')) {
    return notFound()
  }

  return <EmployeeDashboard employees={employees} hrId={hrId} />
}
