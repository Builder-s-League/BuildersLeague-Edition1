import { Card } from '@/components/ui/card'
import ODWrapper from '@/components/OrganizationDashboard/ODWrapper'
import { getOrganizations } from '@/actions/organization-action'

// Prevent caching
export const dynamic = 'force-dynamic'

export default async function OrgDashboard() {
  const { data: organizations, error } = await getOrganizations()

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md p-6 text-center">
          <div className="text-red-500">{error}</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <ODWrapper organizations={organizations || []} />
    </div>
  )
}
