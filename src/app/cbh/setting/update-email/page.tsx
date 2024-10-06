'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { createBrowserClient } from '@/utils/supabase' // Adjust the import path
import { useRouter } from 'next/navigation' // Import useRouter for navigation

const Setting: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const [newEmail, setNewEmail] = useState<string>('') // State for new email input
  const [newPhone, setNewPhone] = useState<string>('') // State for new phone input
  const supabase = createBrowserClient() // Create a Supabase client
  const router = useRouter() // Initialize useRouter for navigation

  // Fetch existing email and phone number when the component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      const { data, error } = await supabase
        .from('cbh_admins')
        .select('email, phone_number')
        .order('id', { ascending: true })
        .limit(1)
        .single()

      if (error) {
        console.error('Error fetching admin data:', error)
      } else {
        setEmail(data?.email || null)
        setPhoneNumber(data?.phone_number || null)

        // Set these values as the initial input values
        setNewEmail(data?.email || '') // Pre-fill input with current email
        setNewPhone(data?.phone_number || '') // Pre-fill input with current phone number
      }
    }

    fetchAdminData()
  }, [supabase])

  // Function to update email and phone number
  const handleUpdate = async () => {
    // Prepare update object with only changed values
    const updates: { email?: string; phone_number?: string } = {}
    if (newEmail && newEmail !== email) updates.email = newEmail
    if (newPhone && newPhone !== phoneNumber) updates.phone_number = newPhone

    // Update the database only if changes are made
    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from('cbh_admins')
        .update(updates)
        .eq('id', 1) // Assuming you're updating the first admin with id=1

      if (error) {
        console.error('Error updating admin data:', error)
      } else {
        // Update the local state after successful update
        setEmail(newEmail || email)
        setPhoneNumber(newPhone || phoneNumber)
      }
    }
  }

  // Function to navigate back
  const handleBack = () => {
    router.back() // This takes the user back to the previous page
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col justify-start space-y-4 px-10">
        {/* Current email and phone display */}
        <div className="mt-10">
          <p className="text-lg">Current Email: {email || 'Loading...'}</p>
          <p className="text-lg">
            Current Phone: {phoneNumber || 'Loading...'}
          </p>
        </div>

        {/* Email input section */}
        <div className="mt-10">
          <p className="mb-2 text-sm text-gray-400">
            *Leave blank to not update
          </p>
          <input
            className="rounded border-2 border-white px-4 py-2 text-lg"
            placeholder="Enter New Email"
            value={newEmail} // Pre-filled with the current email
            onChange={(e) => setNewEmail(e.target.value)} // Update state on input change
          />
        </div>
        <div>
          <input
            className="rounded border-2 border-white px-4 py-2 text-lg"
            placeholder="Enter New Phone"
            value={newPhone} // Pre-filled with the current phone number
            onChange={(e) => setNewPhone(e.target.value)} // Update state on input change
          />
        </div>

        {/* Update button aligned to the left */}
        <Button variant="outline" className="w-full" onClick={handleUpdate}>
          Update
        </Button>

        {/* Back Button */}
        <Button variant="outline" className="w-full" onClick={handleBack}>
          Back
        </Button>

        {/* Buttons section */}
        <div className="flex flex-col space-y-3">
          <Button variant="outline" className="w-full">
            Test Account Info
          </Button>
          <Button variant="outline" className="w-full">
            Contact Us
          </Button>

          {/* Feedback button placed below the stacked buttons */}
          <Button variant="outline" className="w-full">
            Feedback
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Setting
