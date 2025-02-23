'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useState } from 'react'

interface LoginFormProps {
  forgotPasswordRoute: string
  routeOnSubmit: string
}

export default function LoginForm({
  forgotPasswordRoute,
  routeOnSubmit,
}: LoginFormProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    try {
      // Simulate login API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect on successful login
        window.location.href = routeOnSubmit
      } else {
        setError(data.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again later.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <p className="text-center text-sm text-muted-foreground">
          Welcome back! Please sign in to your account.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-4">
        <form
          onSubmit={handleSubmit}
          className="gap-z flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
        >
          <Label className="text-md" htmlFor="email">
            Email
          </Label>
          <Input
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label className="text-md" htmlFor="password">
            Password
          </Label>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-center">
            <Link href={forgotPasswordRoute}>
              <p className="text-align-center text-sm text-blue-700">
                Forgot password?
              </p>
            </Link>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="my-2 w-full">
            Log In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
