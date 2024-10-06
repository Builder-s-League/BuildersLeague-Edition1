'use client'

import Link from 'next/link'
import { useState } from 'react'
import { login } from './actions'

export default function LoginForm() {
  const [emailValue, setEmail] = useState('')
  const [passwordValue, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={emailValue}
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={passwordValue}
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button
        type="submit"
        formAction={login}
        className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground"
      >
        Sign In
      </button>
      <Link href="">
        <p className="text-sm text-blue-700">Forgot the password?</p>
      </Link>
    </form>
  )
}
