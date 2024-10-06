'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { login } from './actions'

export default function MyLogin() {
  // Event handler for form submission
  const [emailValue, setEmail] = useState('')
  const [passwordValue, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="tex-white-900 mt-10 text-center font-serif text-5xl font-bold leading-9 tracking-tight">
          Login Page
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST">
          <div>
            {/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-white-900">
              Username
            </label> */}
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={emailValue}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="your@exmaple.com"
                className="text-white-900 ring-white-300 placeholder:text-white-400 block w-full rounded-md rounded-l border-0 py-1.5 text-center shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              {/* <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">
                Password
              </label> */}
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={passwordValue}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="text-white-900 ring-white-300 placeholder:text-white-400 block w-full rounded-md rounded-l border-0 py-1.5 text-center shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="text-center text-sm">
            <Link href="">
              <p className="text-sm text-blue-700">Forgot the password?</p>
            </Link>
          </div>
          <div>
            <button
              type="submit"
              formAction={login}
              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
          </div>
        </form>

        {/* <p className="mt-10 text-center text-sm text-white-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14-day free trial
          </a>
        </p> */}
      </div>
    </div>
  )
}
