'use client' // Mark this file as a Client Component

import React, { useEffect, useState } from 'react'
import Link from 'next/link' // Using Next.js Link
import { Button } from '@/components/ui/button'
import { createBrowserClient } from '@/utils/supabase' // Adjust the import path

const Setting: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null) // State for phone number
  const supabase = createBrowserClient() // Create a Supabase client

  // Fetch email and phone number when the component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      const { data, error } = await supabase
        .from('cbh_admins')
        .select('email, phone_number')
        .order('id', { ascending: true }) // Order by id to get the first entry
        .limit(1) // Limit the result to the first entry
        .single() // Fetch single record

      if (error) {
        console.error('Error fetching admin data:', error)
      } else {
        setEmail(data?.email || null) // Update state with fetched email
        setPhoneNumber(data?.phone_number || null) // Update state with fetched phone number
        console.log('Fetched email:', data?.email) // Log the fetched email
        console.log('Fetched phone number:', data?.phone_number) // Log the fetched phone number
      }
    }

    fetchAdminData()
  }, [supabase])

  // Log the email and phone number whenever they change
  useEffect(() => {
    if (email) {
      console.log('Stored email:', email) // Log the stored email whenever it updates
    }
    if (phoneNumber) {
      console.log('Stored phone number:', phoneNumber) // Log the stored phone number whenever it updates
    }
  }, [email, phoneNumber])

  return (
    <div className="mt-[10rem] flex flex-col items-center">
      {/* Header with Settings and Log In/Out buttons */}
      <div className="mb-10 flex w-full items-center justify-between px-10">
        {/* Center the Settings button */}
        <div className="flex-grow text-center">
          <Link href="">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Setting
            </Button>
          </Link>
        </div>

        {/* Right-aligned Log In/Out button */}
        <Link href="">
          <Button variant="outline">Log In/Out</Button>
        </Link>
      </div>

      {/* Main container with email/phone and buttons */}
      <div className="flex justify-between gap-10">
        <div className="mb-4 flex flex-col justify-between px-10">
          {/* Email and phone section */}
          <div className="mb-6 mt-10">
            <p className="text-3xl">Email: {email || 'Loading...'}</p>
            <p className="text-3xl">
              Phone number: {phoneNumber || 'Loading...'}
            </p>
          </div>

          {/* Update button aligned to the left with increased margin left */}
          <Link href="/cbh/setting/update-email">
            <Button variant="outline" className="mt-4 w-full">
              Update Email and Phone
            </Button>
          </Link>
        </div>

        {/* Buttons section */}
        <div className="mt-10 flex flex-col items-end space-y-4">
          <Link href="/setting/app-tour">
            <Button variant="outline" className="w-full">
              App Tour Change
            </Button>
          </Link>
          <Link href="/setting/blob-storage">
            <Button variant="outline" className="w-full">
              Storage Change
            </Button>
          </Link>
          <Link href="/setting/app-domain">
            <Button variant="outline" className="w-full">
              App Domain Change
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Setting
