import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export default async function Index() {
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

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">Navigation</h1>
      <div className="flex gap-4">
        <abbr title="USE APPSMITH">
          <Link href="/cbh">
            <button
              disabled
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              CBH
            </button>
          </Link>
        </abbr>
        <abbr title="USE APPSMITH">
          <Link href="/hr">
            <button
              disabled
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              HR
            </button>
          </Link>
        </abbr>
        <Link href="/emp">
          <button className="rounded bg-red-500 px-4 py-2 text-white">
            Employees
          </button>
        </Link>
        <Link href="/about">
          <button className="rounded bg-red-500 px-4 py-2 text-white">
            About
          </button>
        </Link>
        <Link href="/contact-us">
          <button className="rounded bg-red-500 px-4 py-2 text-white">
            Contact
          </button>
        </Link>
      </div>

      {/* Optionally, show Supabase connection status */}
      {isSupabaseConnected ? (
        <p className="mt-8 text-green-600">Supabase is connected!</p>
      ) : (
        <p className="mt-8 text-red-600">Supabase is not connected.</p>
      )}
    </div>
  )
}
