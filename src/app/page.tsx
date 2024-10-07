import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export default async function Navigation() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      console.error('Supabase initialization failed:', e)
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  const navItems = [
    { name: 'CBH', path: '/cbh/login' },
    { name: 'HR', path: '/hr/login' },
    { name: 'Employees', path: '/emp/feed' },
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
            className="bg-light-gray-800 group relative overflow-hidden rounded-lg px-6 py-3 text-3xl font-medium text-gray-900 transition-all duration-300 ease-in-out"
          >
            {item.name}
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
