'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export default async function signOut() {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signOut()
    if (error) {
      return error
    }
    return
  } catch (error) {
    return 'an unexpected error occured'
  }
}
