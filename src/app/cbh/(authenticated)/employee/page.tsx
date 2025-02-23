'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'
import EmployeeCard from '@/components/EmployeeDashboard/EmployeeCard'

export default function Dashboard() {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [employees, setEmployees] = useState(
    [] as Array<{ id: number; name: string }>,
  )

  useEffect(() => {
    async function fetchEmployees() {
      const { data, error } = await supabase.from('users').select('id, name')
      if (error) {
        console.error('Error fetching employees:', error)
      } else if (data) {
        setEmployees(data)
      }
      setLoading(false)
    }
    fetchEmployees()
  }, [supabase])

  if (loading) return <p>Loading...</p>

  return (
    <>
      <EDTopNavBar />

      <div className="pb-8">
        <div className="mt-4 flex w-full flex-col space-y-4 pb-4">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              learningHours={0}
              employeeNumber={employee.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}
