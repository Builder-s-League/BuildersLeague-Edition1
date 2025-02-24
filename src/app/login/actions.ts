'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function signIn(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      return { error: 'Please provide both email and password' }
    }

    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }
    console.log('success')
    return { success: true }
  } catch (error) {
    return { error: 'An unexpected error occurred' }
  }
}
