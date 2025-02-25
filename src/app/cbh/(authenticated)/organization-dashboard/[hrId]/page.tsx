import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'
import EDWrapper from '@/components/EmployeeDashboard/EDWrapper'
import { Card } from '@/components/ui/card'
import { getEmployees } from './actions'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function Dashboard({
  params,
}: {
  params: { hrId: string }
}) {
  const { hrId } = params
  const { employees, error } = await getEmployees(hrId)

  if (error?.includes('Insufficient permissions')) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-7xl">
        <EDWrapper employees={employees} hrId={hrId} />
      </div>
    </div>
  )
}
