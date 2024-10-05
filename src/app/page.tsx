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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">Navigation</h1>
      <div className="flex gap-4">
        <Link href="/cbh">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">CBH</button>
        </Link>
        <Link href="/hr">
          <button className="px-4 py-2 bg-green-500 text-white rounded">HR</button>
        </Link>
        <Link href="/employees">
          <button className="px-4 py-2 bg-red-500 text-white rounded">Employees</button>
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
