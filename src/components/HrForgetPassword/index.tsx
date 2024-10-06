'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const HrForgetPassword = () => {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('') // State to hold success/error messages
  const [loading, setLoading] = useState<boolean>(false) // State to handle loading status

  async function handlePassEmail() {
    setLoading(true) // Set loading to true when the request starts
    setMessage('') // Clear any previous messages

    try {
      const response = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Success: Check your email for the new password.') // Update message on success
      } else {
        setMessage(`Error: ${data.error}`) // Display error message from API response
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setMessage('Network error: Please try again later.') // Handle network error
    } finally {
      setLoading(false) // Set loading to false when the request ends
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            value={email} // Controlled input
            required // Ensure the input is required
          />
          {message && (
            <CardDescription className="mt-2">{message}</CardDescription>
          )}{' '}
          {/* Show message */}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handlePassEmail} disabled={loading}>
            {loading ? (
              <span>Loading...</span> // Loading state
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Get new Password via Email
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
