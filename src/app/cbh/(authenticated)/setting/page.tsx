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
        .from('users')
        .select('email, contact_info')
        .order('id', { ascending: true }) // Order by id to get the first entry
        .limit(1) // Limit the result to the first entry
        .single() // Fetch single record

      if (error) {
        console.error('Error fetching admin data:', error)
      } else {
        setEmail(data?.email || 'not set') // Update state with fetched email
        setPhoneNumber(data?.contact_info || 'not set') // Update state with fetched phone number
        console.log('Fetched email:', data?.email) // Log the fetched email
        console.log('Fetched phone number:', data?.contact_info) // Log the fetched phone number
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
    <div className="max-w mx-auto gap-1 rounded-lg p-6 shadow-md">
      <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Settings
      </h1>

      <div className="flex justify-evenly">
        <div className="flex w-80 flex-col items-start py-8">
          {/* Email and phone section */}
          <div className="mb-6 mt-10">
            <p className="mb-2 max-w-2xl text-lg font-light text-foreground">
              <span className="font-bold">Email:</span> {email || 'Loading...'}
            </p>
            <p className="mb-2 max-w-2xl text-lg font-light text-foreground">
              <span className="font-bold">Phone Number:</span>{' '}
              {phoneNumber || 'Loading...'}
            </p>
          </div>

          {/* Update button aligned to the left with increased margin left */}
          <Link href="/cbh/setting/update-email">
            <Button variant="outline" className=" w-full">
              Update Email and Phone
            </Button>
          </Link>
        </div>

        {/* Buttons section */}
        <div className="mt-10 flex flex-col items-end space-y-4">
          <Link href="/cbh/setting/app-tour">
            <Button variant="outline" className="w-full">
              App Tour Change
            </Button>
          </Link>
          <Link href="/setting/blob-storage">
            <Button className="mt-2 flex w-full flex-col" variant="secondary">
              Storage Change
            </Button>
          </Link>
          <Link href="/setting/app-domain">
            <Button className="w-50  flex flex-col" variant="outline">
              App Domain Change
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Setting
