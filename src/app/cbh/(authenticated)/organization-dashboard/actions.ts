'use server'

import { cookies } from 'next/headers'
import { createAdminClient, createServerClient } from '@/utils/supabase'
import { ProfileCreate, ProfileSummary, ProfileUpdate } from '@/types/profile'
import { revalidatePath } from 'next/cache'

export async function getOrganizations() {
  try {
    const supabase = createServerClient(cookies())

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'User not found' }
    }

    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
          id,
          email,
          name,
          contact_info,
          is_active
        `,
      )
      .eq('role', 2)
      .eq('admin_id', user.id)

    if (error) {
      return { error: 'Failed to fetch organizations' }
    }

    return { data: data as ProfileSummary[] }
  } catch (error) {
    return { error: 'Failed to fetch organizations' }
  }
}

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

export async function updateOrganizationProfile(
  id: string,
  data: ProfileUpdate,
) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        name: data.name,
        contact_info: data.contact_info,
        email: data.email,
        is_active: data.is_active,
      })
      .eq('id', id)

    if (updateError) throw updateError

    return { success: true }
  } catch (error) {
    console.error('Error updating organization:', error)
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update organization',
    }
  }
}

export async function createOrganization(organization: ProfileCreate) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)
    const supabaseAdmin = createAdminClient()

    // Get the current admin's ID
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser()
    if (!currentUser) throw new Error('Not authenticated')

    // Create auth user with all profile data in metadata
    const { data: authData, error: signUpError } =
      await supabaseAdmin.auth.admin.createUser({
        email: organization.email,
        password: organization.password,
        email_confirm: true,
        user_metadata: {
          name: organization.name,
          contact_info: organization.contact_info,
          role: 2, // HR/Organization role
          admin_id: currentUser.id, // Current admin's ID
        },
      })

    if (signUpError) throw signUpError
    if (!authData.user) throw new Error('Failed to create user')

    return { success: true }
  } catch (error) {
    console.error('Error adding organization:', error)
    return {
      error:
        error instanceof Error ? error.message : 'Failed to add organization',
    }
  }
}

export async function addEmployee(data: any, hrId: string) {
  try {
    const supabase = createServerClient(cookies())

    const result = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          contact_info: data.contact_info,
          role: 1,
          admin_id: hrId,
          is_active: true,
        },
        emailRedirectTo: undefined, // Disable email confirmation
      },
    })

    if (result.error) {
      return { error: result.error.message }
    }

    revalidatePath(`/cbh/organization-dashboard/${hrId}`)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to add employee' }
  }
}
