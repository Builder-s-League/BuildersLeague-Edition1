'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'

export default function AddEmployee() {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    profilePhoto: '',
    randomGenPassword: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setNewEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert(`Employee ${newEmployee.name} added successfully!`)
    setNewEmployee({
      name: '',
      email: '',
      profilePhoto: '',
      randomGenPassword: '',
    })
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
              name="profilePhoto"
              value={newEmployee.profilePhoto}
              onChange={handleChange}
              placeholder="Profile Photo"
              required
            />
            <Input
              type="text"
              name="randomGenPassword"
              value={newEmployee.randomGenPassword}
              onChange={handleChange}
              placeholder="Random Generated Password"
              required
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
