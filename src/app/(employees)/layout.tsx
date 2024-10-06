import EmployeeBottomNavBar from '@/components/EmployeeBottomNavBar'

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pb-40"> {children}</div>
      <EmployeeBottomNavBar />
    </>
  )
}
