'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AddOrganization() {
  const [newOrg, setNewOrg] = useState({
    name: '',
    address: '',
    contactInfo: '',
    hrName: '',
    hrEmail: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setNewOrg((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert(`Organization ${newOrg.name} added successfully!`)
    setNewOrg({
      name: '',
      address: '',
      contactInfo: '',
      hrName: '',
      hrEmail: '',
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 rounded border p-4">
        <h2 className="mb-4 text-center text-lg">Add New Organization</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <Input
            type="text"
            name="name"
            value={newOrg.name}
            onChange={handleChange}
            placeholder="Organization Name"
            required
          />
          <Input
            type="text"
            name="address"
            value={newOrg.address}
            onChange={handleChange}
            placeholder="Organization Address"
            required
          />
          <Input
            type="text"
            name="contactInfo"
            value={newOrg.contactInfo}
            onChange={handleChange}
            placeholder="Contact Contact Information"
            required
          />
          <Input
            type="text"
            name="hrName"
            value={newOrg.hrName}
            onChange={handleChange}
            placeholder="HR Manager Name"
            required
          />
          <Input
            type="email"
            name="hrEmail"
            value={newOrg.hrEmail}
            onChange={handleChange}
            placeholder="HR Manager Email"
            required
          />
          <Button type="submit" className="rounded bg-blue-500 p-2 text-white">
            Submit
          </Button>
        </form>
      </div>
      <OrganizationCBHFooter />
    </div>
  )
}
