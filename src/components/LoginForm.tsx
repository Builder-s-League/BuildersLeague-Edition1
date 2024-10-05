// components/LoginForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // mock login
    if (email === 'admin@cbh.ca' && password === 'password') {
      window.alert('Logged in successfully!')
    } else {
      setErrorMessage('Invalid username or password')
    }
  }

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // mock login
    if (email === 'admin@cbh.ca') {
      // redirects to password reset page
      router.push('/password-reset')
    } else {
      setErrorMessage('Email not found.')
    }
  }

  return (
    <div>
      {!isForgotPassword ? (
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@mail.ca"
            required
            className="rounded-md border px-4 py-2"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="rounded-md border px-4 py-2"
          />

          <button
            type="submit"
            className="rounded-md bg-green-700 px-4 py-2 text-white"
          >
            Sign In
          </button>

          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}

          <a
            href="#"
            onClick={() => setIsForgotPassword(true)}
            className="text-sm underline hover:text-blue-500"
          >
            Forgot Password?
          </a>
        </form>
      ) : (
        // forgot Password Form
        <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@mail.ca"
            required
            className="rounded-md border px-4 py-2"
          />

          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Send Reset Link
          </button>

          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}

          <a
            href="#"
            onClick={() => setIsForgotPassword(false)}
            className="text-sm underline hover:text-blue-500"
          >
            Back to Login
          </a>
        </form>
      )}
    </div>
  )
}
