'use server'

import { cookies } from 'next/headers'
import { createAdminClient, createServerClient } from '@/utils/supabase'
import { revalidatePath } from 'next/cache'
import { Profile, ProfileCreate, ProfileUpdate } from '@/types/profile'
import { User } from '@supabase/supabase-js'

export async function getEmployees(hrId: string): Promise<{
  employees: Profile[]
  error?: string
}> {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    // get logged user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { employees: [], error: 'Not authenticated' }
    }
    console.log('user', user)
    // Get the hr's profile that is in the param
    const { data: hrProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', hrId)
      .single()

    console.log(hrId, hrProfile)
    if (profileError) {
      return { employees: [], error: 'Failed to fetch profile' }
    }

    console.log('hr', hrProfile)

    if (hrProfile.admin_id !== user.id) {
      return { employees: [], error: 'Insufficient permissions' }
    }

    // Fetch employees based on admin_id
    const { data: employees, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 1)
      .eq('is_active', true)
      .eq('admin_id', hrProfile.id)
      .order('name', { ascending: true })

    console.log('employees', employees)
    if (error) {
      return { employees: [], error: 'Failed to fetch employees' }
    }

    return { employees: employees || [] }
  } catch (error) {
    return { employees: [], error: 'Failed to fetch data' }
  }
}

export async function deleteEmployee(id: string, hrId: string) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    // First verify the current user is an admin
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError) throw new Error('Authentication required')

    // Check admin permissions
    const { data: adminProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user?.id)
      .single()

    if (profileError) throw new Error('Failed to verify admin status')
    if (adminProfile.role < 2) throw new Error('Insufficient permissions')

    // Then delete the auth user using admin client
    const supabaseAdmin = createAdminClient()
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)
    if (authError) throw authError

    // Add revalidation here
    revalidatePath(`/cbh/organization-dashboard/${hrId}`)
    return { success: true }
  } catch (error) {
    console.error('Error deleting employee:', error)
    return {
      error:
        error instanceof Error ? error.message : 'Failed to delete employee',
    }
  }
}

export async function addEmployee(data: ProfileCreate, hrId: string) {
  try {
    const supabase = createAdminClient()

    // Create auth user with all profile data in metadata
    const { data: authData, error: signUpError } =
      await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        user_metadata: {
          name: data.name,
          contact_info: data.contact_info,
          role: 1, // Employee role
          admin_id: hrId, // Current hr's ID
          is_active: true,
        },
      })

    if (signUpError) throw signUpError
    if (!authData.user) throw new Error('Failed to create user')

    // Add revalidation here
    revalidatePath(`/cbh/organization-dashboard/${hrId}`)
    return { success: true }
  } catch (error) {
    console.error('Error adding employee:', error)
    return { error: 'Failed to add employee' }
  }
}

export async function updateEmployee(
  id: string,
  data: ProfileUpdate,
  hrId: string,
) {
  try {
    const supabase = createServerClient(cookies())
    const { error } = await supabase.from('profiles').update(data).eq('id', id)

    if (error) throw error

    // Add revalidation here
    revalidatePath(`/cbh/organization-dashboard/${hrId}`)
    return { success: true }
  } catch (error) {
    return { error: 'Failed to update employee' }
  }
}

export async function getEmployeeDetails(id: string, hrId: string) {
  try {
    const supabase = createServerClient(cookies())
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .eq('admin_id', hrId)
      .single()
    if (error) throw error
    return data
  } catch (error) {
    return { error: 'Failed to get employee details' }
  }
}
