'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn(formData)

      if (result?.error) {
        setError(result.error)
        return
      }

      if (result?.role) {
        switch (result.role) {
          case 3:
            router.push('/cbh')
            break
          case 2:
            router.push('/hr')
            break
          default:
            router.push('/emp')
        }
      }
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Login</h1>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
            <Button asChild variant="link">
              <Link href="/forgot-password">Forgot Password?</Link>
            </Button>
            <Button type="submit" className="bg-green-700" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
