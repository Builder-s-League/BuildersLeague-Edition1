import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { ArrowRight } from 'lucide-react'
import CBHNavBar from '@/components/NavBar/CBHNavbar'

export default async function CBHNavigation() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is for Supabase initialization check.
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      console.error('Supabase initialization failed:', e)
      return false
    }
  }

  const navItems = [
    { name: 'About', href: 'cbh/about' },
    { name: 'Login', href: 'cbh/login' },
    { name: 'Organization Dashboard', href: 'cbh/organization-dashboard' },
    { name: 'Settings', href: 'cbh/setting' },
    { name: 'Survey Dashboard', href: 'cbh/survey-dash' },
  ]

  return (
    <>
      {/* DON'T DELETE! MUST KEEP THIS COMPONENT FOR THE DEMO */}
      <CBHNavBar />
      {/* DON'T DELETE! MUST KEEP THIS COMPONENT FOR THE DEMO */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b ">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          CBH Navigation
        </h1>
        <nav className="flex flex-col flex-wrap justify-center gap-4 md:flex-row">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex items-center overflow-hidden rounded-lg border px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out "
            >
              {item.name}
              <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:opacity-100" />
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
