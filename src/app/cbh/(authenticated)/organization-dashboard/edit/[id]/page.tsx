'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  deleteOrganization,
  resetOrganizationPassword,
  updateOrganizationProfile,
} from '../../actions'
import ConfirmationDialog from '@/components/ui/confirmation-dialog'
import { generateSecurePassword } from '@/utils/password'

export default function EditOrganization() {
  const { id } = useParams()
  const router = useRouter()
  const supabase = createBrowserClient()

  const [organization, setOrganization] = useState({
    name: '',
    contact_info: '',
    email: '',
    is_active: false,
  })

  // Track original data to compare changes
  const [originalData, setOriginalData] = useState({
    name: '',
    contact_info: '',
    email: '',
    is_active: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState(
    generateSecurePassword(),
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrganization = async () => {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .eq('role', 2)
        .single()

      if (profileError) {
        console.error('Error fetching organization:', profileError)
        setError(profileError.message)
        return
      }

      if (profile) {
        const orgData = {
          name: profile.name,
          contact_info: profile.contact_info,
          email: profile.email,
          is_active: profile.is_active,
        }
        setOrganization(orgData)
        setOriginalData(orgData) // Store original data
      }
    }

    fetchOrganization()
  }, [id, supabase])

  // Check if form data has changed
  const hasChanges = () => {
    return (
      organization.name !== originalData.name ||
      organization.contact_info !== originalData.contact_info ||
      organization.email !== originalData.email ||
      organization.is_active !== originalData.is_active
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrganization((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setOrganization((prev) => ({ ...prev, is_active: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await updateOrganizationProfile(id as string, {
        name: organization.name,
        contact_info: organization.contact_info,
        email: organization.email,
        is_active: organization.is_active,
      })

      if (result.error) {
        setError(result.error)
        return
      }

      // Update original data after successful update
      setOriginalData(organization)
      router.replace('/cbh/organization-dashboard')
    } catch (err) {
      console.error('Error updating organization:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to update organization',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteOrganization(id as string)

      if (result.error) {
        setError(result.error)
        return
      }

      router.replace('/cbh/organization-dashboard')
    } catch (err) {
      console.error('Error deleting organization:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to delete organization',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setIsLoading(true)
    try {
      const { error: resetError } = await resetOrganizationPassword(
        id as string,
        generatedPassword,
      )

      if (resetError) throw resetError
      // Close the reset password dialog
      setIsResetPasswordOpen(false)
      // Generate new password for next time
      setGeneratedPassword(generateSecurePassword())
    } catch (err) {
      console.error('Error resetting password:', err)
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 rounded border p-4">
        <h1 className="mb-6 text-center text-lg">Edit Organization</h1>
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
              placeholder="Email"
              required
            />
          </div>

          <div>
            <Button
              type="button"
              onClick={() => setIsResetPasswordOpen(true)}
              disabled={isLoading}
            >
              Reset Password
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={organization.is_active}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="is_active">Active Status</Label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex space-x-2">
            <Button type="submit" disabled={isLoading || !hasChanges()}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
            <ConfirmationDialog
              trigger={
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isLoading}
                >
                  Delete Organization
                </Button>
              }
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete the organization account and remove their data from our servers."
              actionLabel="Delete"
              onConfirm={handleDelete}
              isLoading={isLoading}
              variant="destructive"
            />
          </div>
        </form>
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
                Make sure to copy and share this password with the organization
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsResetPasswordOpen(false)
                setGeneratedPassword(generateSecurePassword()) // Generate new password when dialog is closed
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
