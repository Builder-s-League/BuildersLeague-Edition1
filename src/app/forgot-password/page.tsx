'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="flex w-full flex-1 flex-col justify-center px-8 sm:max-w-md">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Forgot Password</h2>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Label htmlFor="email">Enter your email address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-blue-600">
              Send Reset Link
            </Button>

            {message && (
              <p className="mt-4 bg-blue-100 p-4 text-center text-blue-700">
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
