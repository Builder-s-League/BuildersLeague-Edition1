'use server'

import { cookies } from 'next/headers'
import { createAdminClient, createServerClient } from '@/utils/supabase'

export async function deleteOrganization(id: string) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ is_active: false })
      .eq('id', id)

    if (profileError) throw profileError

    const supabaseAdmin = createAdminClient()
    // Then delete the auth user using admin client
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)
    if (authError) throw authError

    return { success: true }
  } catch (error) {
    console.error('Error deleting organization:', error)
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to delete organization',
    }
  }
}

export async function resetOrganizationPassword(
  id: string,
  newPassword: string,
) {
  try {
    const supabaseAdmin = createAdminClient()
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      password: newPassword,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error resetting password:', error)
    return {
      error:
        error instanceof Error ? error.message : 'Failed to reset password',
    }
  }
}
