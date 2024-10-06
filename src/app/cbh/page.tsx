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
        <Link href="cbh/about">
          <button className="bg-blue-500 px-4 py-2 text-white">About</button>
        </Link>
        <Link href="cbh/my-login">
          <button className="bg-blue-500 px-4 py-2 text-white">My Login</button>
        </Link>
        <Link href="cbh/organization-dashboard">
          <button className="bg-blue-500 px-4 py-2 text-white">
            Organization Dashboard
          </button>
        </Link>
        <Link href="cbh/setting">
          <button className="bg-blue-500 px-4 py-2 text-white">Settings</button>
        </Link>
        <Link href="cbh/survey-dash">
          <button className="bg-blue-500 px-4 py-2 text-white">
            Survey Dashboard
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
