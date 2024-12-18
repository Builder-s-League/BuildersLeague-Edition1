'use client'
import React, { FormEvent } from 'react'

export default function ForgotPassword() {
  // Event handler for form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // You can handle form data here
    console.log('Forgot password form submitted')
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
          Forgot Password
        </h2>
        <p className="text-white-400 mt-2 text-center text-sm">
          Enter your email and we’ll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="text-white-900 ring-white-300 placeholder:text-white-400 block w-full rounded-md border-0 py-1.5 text-center shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <p className="text-white-500 mt-10 text-center text-sm">
          Remembered your password?{' '}
          <a
            href="/cbh/my-login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  )
}
