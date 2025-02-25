import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container ">
      <EDTopNavBar />
      {children}
    </div>
  )
}
