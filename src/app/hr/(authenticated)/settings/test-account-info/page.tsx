'use client'
import React, { useState, useEffect } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { Button } from '@/components/ui/button'

type DataType = {
  id: string
  name: string
  email: string
  contact_info: string
  isactive: string
  password: string
}

export default function TestAccountInfo() {
  const supabase = createBrowserClient()
  const [userData, setUserData] = useState<DataType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, contact_info, isactive, password')
          .like('name', '%test%')

        if (error) throw error

        setUserData(data || [])
      } catch (err) {
        console.error('Error fetching users:', err)
        setError('Failed to fetch users')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [supabase])

  if (isLoading) {
    return <div>LOADING...</div>
  }

  return (
    <div className="m-auto flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <h2 className="text-m mb-5 text-5xl text-muted-foreground">
          {userData[0].name}
        </h2>
        <div className="flex flex-col">
          <div className="mb-5 flex h-4 w-1/2">{userData[0].email}</div>
          <div className="mb-5 flex h-4 w-1/2">{userData[0].password}</div>
        </div>
      </div>

      <Button>
        <a href="./">Go back</a>
      </Button>
    </div>
  )
}
