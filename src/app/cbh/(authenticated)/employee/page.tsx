import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'
import EmployeeCard from '@/components/EmployeeDashboard/EmployeeCard'

export default function Dashboard() {
  return (
    <>
      <EDTopNavBar />

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
