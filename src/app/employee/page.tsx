import EmployeeCard from '@/components/EmployeeDashboard/EmployeeCard'
import PageButton from '@/components/EmployeeDashboard/PageButton'

export default function Dashboard() {
  return (
    <>
      <div className="flex w-full flex-col p-4">
        <div className="flex flex-wrap space-x-4">
          <PageButton label="Back to last page" link="/" />
        </div>
      </div>

      <div className="  flex w-full flex-col space-y-2">
        <div className="m-6 flex flex-col space-x-4 self-end">
          <div className="flex">
            <PageButton label="Add" link="/add" />
            <PageButton label="Import" link="/import" />
            <PageButton label="Export" link="/export" />
          </div>

          <PageButton label="Email to all" link="/email" />
        </div>
      </div>

      <div>
        <div className="mt-4 flex w-full flex-col space-x-4">
          {[
            { name: 'Philip Fake Name', learningHours: 20, employeeNumber: 10 },
            { name: 'Jane Doe', learningHours: 15, employeeNumber: 11 },
            { name: 'John Smith', learningHours: 25, employeeNumber: 12 },
          ].map((employee, index) => (
            <EmployeeCard
              key={index}
              name={employee.name}
              learningHours={employee.learningHours}
              employeeNumber={employee.employeeNumber}
            />
          ))}
        </div>
      </div>
    </>
  )
}
