'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { generateSecurePassword } from '@/utils/password'
import { addEmployee } from '../actions'
import { toast } from 'sonner'

export default function AddEmployeePage({
  params: { hrId },
}: {
  params: { hrId: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    contact_info: '',
    password: generateSecurePassword(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await addEmployee(employee, hrId)

      if (result.error) throw new Error(result.error)

      router.replace(`/cbh/organization-dashboard/${hrId}`)
      toast.success('Employee added successfully')
    } catch (err) {
      console.error('Error adding employee:', err)
      setError(err instanceof Error ? err.message : 'Failed to add employee')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Add New Employee</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-6 rounded-lg border bg-white p-6 shadow-sm md:p-8"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_info" className="text-base">
            Contact Information
          </Label>
          <Input
            id="contact_info"
            name="contact_info"
            value={employee.contact_info}
            onChange={handleChange}
            placeholder="Phone number or address"
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-base">
            Generated Password
          </Label>
          <div className="flex gap-2">
            <Input
              id="password"
              value={employee.password}
              readOnly
              className="h-12 bg-muted"
            />
            <Button
              type="button"
              variant="outline"
              className="h-12"
              onClick={() =>
                setEmployee((prev) => ({
                  ...prev,
                  password: generateSecurePassword(),
                }))
              }
            >
              Regenerate
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            This password will be used for the employee&apos;s initial login
          </p>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 px-8 py-6"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 px-8 py-6" disabled={loading}>
            {loading ? 'Adding Employee...' : 'Add Employee'}
          </Button>
        </div>
      </form>
    </div>
  )
}
