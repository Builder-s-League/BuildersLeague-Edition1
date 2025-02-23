'use client'
import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBrowserClient } from '@/utils/supabase'
import { useMemo, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditEmployee() {
  const supabase = useMemo(() => createBrowserClient(), [])
  const router = useRouter()
  const params = useParams()
  const employeeParam = Array.isArray(params.employeeNumber)
    ? params.employeeNumber[0]
    : params.employeeNumber
  const employeeNumber = parseInt(employeeParam || '0', 10)
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    contact_info: '',
    admin_id: 1, // TODO: Get org_id from url
    created_at: new Date(),
    updated_at: new Date(),
    isactive: true,
    role: 2, // 0 -> admin, 1 -> org, 2 -> user
    password: '', // Add password field
  })

  useEffect(() => {
    const fetchEmployee = async () => {
      if (isNaN(employeeNumber) || employeeNumber <= 0) {
        alert('Invalid employee number')
        return
      }
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', employeeNumber)
        .single()
      if (error) {
        alert(error.message)
      } else {
        setEmployee(data)
      }
    }
    fetchEmployee()
  }, [employeeNumber, supabase])

  const handleChange = (e: any) => {
    const { name, value, files } = e.target
    setEmployee((prevData) => ({
      ...prevData,
      [name]: name === 'contact_info' && files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (isNaN(employeeNumber) || employeeNumber <= 0) {
      alert('Invalid employee number')
      return
    }
    if (/\s/.test(employee.password)) {
      alert('Password cannot contain spaces')
      return
    }
    const response = await supabase
      .from('users')
      .update(employee)
      .eq('id', employeeNumber)
    if (response.error) {
      alert(response.error.message)
    } else {
      alert(`Employee ${employee.name} updated successfully!`)
      router.push('/cbh/employee')
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <EDTopNavBar />
      <div className="container mx-auto p-4">
        <div className="mb-6 rounded border p-4">
          <h2 className="mb-4 text-center text-lg">Edit Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <Input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Employee Name"
              required
            />
            <Input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <Input
              type="text"
              name="contact_info"
              value={employee.contact_info}
              onChange={handleChange}
              placeholder="Contact Information"
              required
            />
            <Input
              type="text" // Change from "password" to "text"
              name="password"
              value={employee.password}
              onChange={handleChange}
              placeholder="Password"
            />

            <Button
              type="submit"
              className="rounded bg-blue-500 p-2 text-white"
            >
              Update
            </Button>
          </form>
          <Button
            onClick={handleBack}
            className="mt-4 rounded bg-gray-500 p-2 text-white"
          >
            Back
          </Button>
        </div>
        <OrganizationCBHFooter />
      </div>
    </>
  )
}
