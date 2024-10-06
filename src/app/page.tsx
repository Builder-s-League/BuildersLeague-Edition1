import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import InitialScreen from '@/components/HomePage/InitialScreen'

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

  return <InitialScreen isSupabaseConnected={isSupabaseConnected} />
}
