'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase' // Import your custom client creator

const supabase = createBrowserClient() // Use your custom client creation function

export default function Navigation() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setIsSignedIn(!!session)
  }

  useEffect(() => {
    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // Specifically handle sign out event
      if (event === 'SIGNED_OUT') {
        setIsSignedIn(false)
      } else {
        checkSession()
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const navItems = [
    { name: 'Login', path: '/login', disabled: isSignedIn },
    { name: 'About', path: '/about' },
  ]

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-6xl font-bold tracking-tight text-gray-900">
        Navigation
      </h1>
      <nav className="flex flex-col flex-wrap justify-center gap-4 md:flex-row">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`bg-light-gray-800 group relative overflow-hidden rounded-lg px-6 py-3 text-3xl font-medium text-gray-900 transition-all duration-300 ease-in-out ${
              item.disabled ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {item.name}
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
        ))}

        {/* Render the Logout button if the user is signed in */}
        {isSignedIn && (
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-6 py-3 text-3xl font-medium text-white transition-all duration-300 ease-in-out hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  )
}
