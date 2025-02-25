'use client'

import { useState, useEffect } from 'react'
import { useRouter, notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Profile } from '@/types/profile'
import { updateEmployee, getEmployeeDetails } from '../../actions'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { generateSecurePassword } from '@/utils/password'
import { resetEmployeePassword } from '../../../actions'

export default function EditEmployee({
  params: { employeeId, hrId },
}: {
  params: { employeeId: string; hrId: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState(
    generateSecurePassword(),
  )

  const [employee, setEmployee] = useState<Profile>({
    id: employeeId,
    name: '',
    email: '',
    contact_info: '',
    admin_id: '',
    created_at: new Date().toISOString(),
    is_active: true,
    role: 1,
    updated_at: new Date().toISOString(),
  })

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const data = await getEmployeeDetails(employeeId, hrId)

        setEmployee(data)
      } catch (err) {
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [employeeId, hrId])

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
      const { error: updateError } = await updateEmployee(
        employeeId,
        {
          name: employee.name,
          email: employee.email,
          contact_info: employee.contact_info,
          is_active: employee.is_active,
        },
        hrId,
      )

      if (updateError) throw updateError

      router.replace(`/cbh/organization-dashboard/${hrId}`)
      toast.success('Employee updated successfully')
    } catch (err) {
      console.error('Error updating employee:', err)
      setError(err instanceof Error ? err.message : 'Failed to update employee')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setLoading(true)
    try {
      const { error: resetError } = await resetEmployeePassword(
        employeeId as string,
        generatedPassword,
      )

      if (resetError) throw resetError
      setIsResetPasswordOpen(false)
      setGeneratedPassword(generateSecurePassword())
      toast.success('Password reset successfully')
    } catch (err) {
      console.error('Error resetting password:', err)
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-start justify-center py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="mb-6 text-2xl font-bold md:text-3xl">Edit Employee</h1>

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

            <div>
              <Button
                type="button"
                onClick={() => setIsResetPasswordOpen(true)}
                disabled={loading}
              >
                Reset Password
              </Button>
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
              <Button
                type="submit"
                className="flex-1 px-8 py-6"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Employee'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="generatedPassword">Generated Password</Label>
              <div className="flex gap-2">
                <Input
                  id="generatedPassword"
                  value={generatedPassword}
                  readOnly
                  className="bg-muted"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setGeneratedPassword(generateSecurePassword())}
                >
                  Regenerate
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure to copy and share this password with the employee
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleResetPassword} disabled={loading}>
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsResetPasswordOpen(false)
                setGeneratedPassword(generateSecurePassword())
              }}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
