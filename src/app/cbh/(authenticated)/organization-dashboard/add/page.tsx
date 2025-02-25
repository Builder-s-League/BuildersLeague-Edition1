'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { generateSecurePassword } from '@/utils/password'
import { createOrganization } from '../actions'

export default function AddOrganization() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [organization, setOrganization] = useState({
    name: '',
    contact_info: '',
    email: '',
    password: generateSecurePassword(),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrganization((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Get the current admin's ID
      const result = await createOrganization(organization)

      if (result.error) throw result.error

      router.replace('/cbh/organization-dashboard')
    } catch (error) {
      console.error('Error adding organization:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to add organization',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Add New Organization</h1>
        {error && (
          <div className="bg-destructive/15 mb-4 rounded-lg p-3 text-destructive">
            {error}
          </div>
        )}

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
            <Label htmlFor="contact_info">Contact Information</Label>
            <Input
              type="text"
              id="contact_info"
              name="contact_info"
              value={organization.contact_info}
              onChange={handleInputChange}
              placeholder="Contact Information"
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

          <div className="space-y-2">
            <Label htmlFor="password">Generated Password</Label>
            <div className="flex gap-2">
              <Input
                id="password"
                value={organization.password}
                readOnly
                className="bg-muted"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setOrganization((prev) => ({
                    ...prev,
                    password: generateSecurePassword(),
                  }))
                }
              >
                Regenerate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This password will be used for the organization&apos;s initial
              login
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Adding Organization...' : 'Add Organization'}
          </Button>
        </form>
      </div>
    </div>
  )
}
