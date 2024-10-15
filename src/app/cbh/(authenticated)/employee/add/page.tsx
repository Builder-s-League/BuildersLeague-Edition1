'use client'
import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBrowserClient } from '@/utils/supabase'
import { useMemo, useState } from 'react'

export default function AddEmployee() {
  const supabase = useMemo(() => createBrowserClient(), [])

  function generatePassword() {
    var length = 8,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      retVal = ''
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    return retVal
  }

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    contact_info: '',
    admin_id: 1, // TODO: Get org_id from url
    created_at: new Date(),
    updated_at: new Date(),
    isactive: true,
    role: 2, // 0 -> admin, 1 -> org , 2 -> user
    password: generatePassword(),
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setNewEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const response = await supabase.from('users').insert(newEmployee)
    if (response.error) alert(response.error.message)
    else {
      alert(`Employee ${newEmployee.name} added successfully!`)
      setNewEmployee({
        name: '',
        email: '',
        contact_info: '',
        created_at: new Date(),
        updated_at: new Date(),
        isactive: true,
        role: 2, // 0 -> admin, 1 -> org , 2 -> user
        admin_id: 1, // TODO: Get org_id from url
        password: generatePassword(),
      })
    }
  }

  return (
    <>
      <EDTopNavBar />
      <div className="container mx-auto p-4">
        <div className="mb-6 rounded border p-4">
          <h2 className="mb-4 text-center text-lg">Add New Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <Input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
              placeholder="Employee Name"
              required
            />
            <Input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <Input
              type="file"
              name="contact_info"
              value={newEmployee.contact_info}
              onChange={handleChange}
              placeholder="Profile Photo"
              required
            />
            <Input
              type="text"
              value={newEmployee.password}
              placeholder="Random Generated Password"
              readOnly
            />

            <Button
              type="submit"
              className="rounded bg-blue-500 p-2 text-white"
            >
              Add
            </Button>
          </form>
        </div>
        <OrganizationCBHFooter />
      </div>
    </>
  )
}
