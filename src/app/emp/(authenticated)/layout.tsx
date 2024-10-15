import EmployeeBottomNavBar from '@/components/EmployeeBottomNavBar'
import { EmployeeTopNavBar } from '@/components/EmployeeTopNavBar'
import MenuDrawer from '@/components/MenuDrawer'
import { Button } from '@/components/ui/button' // Assuming ShadCN button component
import { ArrowLeftIcon } from 'lucide-react'

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full flex-col">
      <EmployeeTopNavBar />
      <div className="pb-40">{children}</div>
      <EmployeeBottomNavBar />
    </div>
  )
}
