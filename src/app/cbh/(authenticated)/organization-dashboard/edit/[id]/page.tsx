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
import bcrypt from 'bcryptjs'
export default function EditOrganization() {
  const { id } = useParams()
  const router = useRouter()
  const supabase = createBrowserClient()

  const [organization, setOrganization] = useState({
    name: '',
    // address: '',
    contact_info: '',
    // hr_name: '',
    email: '',
    isactive: false,
    password: '', // Add password field
  })

  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const fetchOrganization = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .eq('role', 1)
        .single()

      if (error) {
        console.error('Error fetching organization:', error)
      } else if (data) {
        setOrganization(data)
      }
    }

    fetchOrganization()
  }, [id, supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrganization((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setOrganization((prev) => ({ ...prev, isactive: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('users')
      .update(organization)
      .eq('id', id)

    if (error) {
      console.error('Error updating organization:', error)
    } else {
      router.push('/cbh/organization-dashboard')
    }
  }

  const handleDelete = async () => {
    const { error } = await supabase.from('users').delete().eq('id', id)

    if (error) {
      console.error('Error deleting organization:', error)
    } else {
      router.push('/cbh/organization-dashboard')
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match")
      return
    }

    const { error } = await supabase
      .from('users')
      .update({ password: await bcrypt.hash(organization.password, 10) })
      .eq('id', id)

    if (error) {
      console.error('Error resetting password:', error)
      alert('Failed to reset password')
    } else {
      alert('Password reset successfully')
      setIsResetPasswordOpen(false)
      setNewPassword('')
      setConfirmPassword('')
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

          {/* <div>
            <Label htmlFor="address">Organization Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={organization.address}
              onChange={handleInputChange}
              placeholder="Organization Address"
              required
            />
          </div> */}

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

          {/* <div>
            <Label htmlFor="hr_name">HR Manager Name</Label>
            <Input
              type="text"
              id="hr_name"
              name="hr_name"
              value={organization.hr_name}
              onChange={handleInputChange}
              placeholder="HR Manager Name"
              required
            />
          </div> */}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={organization.email}
              onChange={handleInputChange}
              placeholder="HR Manager Email"
              required
            />
          </div>

          <div>
            <Button type="button" onClick={() => setIsResetPasswordOpen(true)}>
              Reset Email Password
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isactive"
              checked={organization.isactive}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isactive">Active / Inactive</Label>
          </div>

          <div className="flex space-x-2">
            <Button type="submit">Update</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleResetPassword}>Update</Button>
            <Button
              variant="outline"
              onClick={() => setIsResetPasswordOpen(false)}
            >
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
