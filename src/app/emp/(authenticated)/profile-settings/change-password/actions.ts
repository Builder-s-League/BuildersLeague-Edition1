'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function updatePassword(oldPassword: string, newPassword: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError) throw new Error('Authentication error')
    if (!user?.email) throw new Error('User email not found')

    // First verify the old password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: oldPassword,
    })

    // If sign in fails, the old password is incorrect
    if (signInError) {
      return {
        error: 'Current password is incorrect',
      }
    }

    // If old password is verified, update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      throw updateError
    }

    return { success: true }
  } catch (error) {
    console.error('Password update error:', error)
    return {
      error:
        error instanceof Error ? error.message : 'Failed to update password',
    }
  }
}
