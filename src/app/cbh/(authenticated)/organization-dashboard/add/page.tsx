'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import bcrypt from 'bcryptjs'

export default function AddOrganization() {
  const router = useRouter()
  const supabase = createBrowserClient()

  const [organization, setOrganization] = useState({
    name: '',
    contact_info: '',
    email: '',
    isactive: false, // Default value set to false
    password: '',
    role: 1, // Assuming role 1 is for organizations
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrganization((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('users').insert({
      ...organization,
      password: await bcrypt.hash(organization.password, 10),
    })

    if (error) {
      console.error('Error adding organization:', error)
      alert('Failed to add organization')
    } else {
      alert('Organization added successfully')
      router.push('/cbh/organization-dashboard')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 rounded border p-4">
        <h1 className="mb-6 text-center text-lg">Add New Organization</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Organization Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={organization.name}
              onChange={handleInputChange}
              placeholder="Organization Name"
              required
            />
          </div>

          <div>
            <Label htmlFor="contact_info">
              Organization Contact Information
            </Label>
            <Input
              type="text"
              id="contact_info"
              name="contact_info"
              value={organization.contact_info}
              onChange={handleInputChange}
              placeholder="Organization Contact Information"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={organization.email}
              onChange={handleInputChange}
              placeholder="HR Email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={organization.password}
              onChange={handleInputChange}
              placeholder="Set Password"
              required
            />
          </div>

          <div>
            <Button type="submit">Add Organization</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
