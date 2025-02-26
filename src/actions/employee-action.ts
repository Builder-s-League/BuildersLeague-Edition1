'use server'

import { cookies } from 'next/headers'
import { createAdminClient, createServerClient } from '@/utils/supabase'
import { revalidatePath } from 'next/cache'
import { Profile, ProfileCreate, ProfileUpdate } from '@/types/profile'
import { User } from '@supabase/supabase-js'

export async function getEmployeesAsCBH(hrId: string): Promise<{
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
    // Get the hr's profile that is in the param
    const { data: hrProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', hrId)
      .single()

    if (profileError) {
      return { employees: [], error: 'Failed to fetch profile' }
    }

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

    if (error) {
      return { employees: [], error: 'Failed to fetch employees' }
    }

    return { employees: employees || [] }
  } catch (error) {
    return { employees: [], error: 'Failed to fetch data' }
  }
}

export async function getEmployeesAsHR(): Promise<{
  employees: Profile[]
  hrId: string
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
      return { employees: [], hrId: '', error: 'Not authenticated' }
    }
    const { data: employees, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 1)
      .eq('is_active', true)
      .eq('admin_id', user?.id)
      .order('name', { ascending: true })

    if (error) {
      return { employees: [], hrId: '', error: 'Failed to fetch employees' }
    }

    return { employees: employees || [], hrId: user?.id }
  } catch (error) {
    return { employees: [], hrId: '', error: 'Failed to fetch data' }
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

export async function resetEmployeePassword(id: string, newPassword: string) {
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

export async function importEmployees(
  data: ProfileCreate[],
  hrId: string,
  revalidatePathName: string,
): Promise<void> {
  const supabase = createServerClient(cookies())
  const supabaseAdmin = createAdminClient()
  const createdUsers: string[] = [] // Keep track of created users for rollback

  try {
    // First validate if any emails already exist
    const { data: existingEmployees, error: existingEmployeesError } =
      await supabase
        .from('profiles')
        .select('id, email')
        .in(
          'email',
          data.map((employee) => employee.email),
        )

    if (existingEmployeesError) throw existingEmployeesError

    if (existingEmployees.length > 0) {
      const existingEmails = existingEmployees.map((emp) => emp.email)
      throw new Error('Some emails already exist: ' + existingEmails.join(', '))
    }

    // Begin batch creation
    for (const employee of data) {
      try {
        // Create auth user
        const { data: userData, error: createError } =
          await supabaseAdmin.auth.admin.createUser({
            email: employee.email,
            password: employee.password,
            user_metadata: {
              name: employee.name,
              contact_info: employee.contact_info,
              role: 1, // Employee role
              admin_id: hrId,
              is_active: true,
            },
          })

        if (createError) throw createError
        if (!userData.user) throw new Error('Failed to create user')

        createdUsers.push(userData.user.id)
      } catch (error) {
        // If any user creation fails, rollback all previously created users
        console.error('Error creating user, initiating rollback:', error)

        // Rollback: Delete all users created in this batch
        for (const userId of createdUsers) {
          try {
            await supabaseAdmin.auth.admin.deleteUser(userId)
          } catch (rollbackError) {
            console.error(
              'Error during rollback for user:',
              userId,
              rollbackError,
            )
          }
        }

        throw new Error(
          error instanceof Error
            ? `Import failed: ${error.message}`
            : 'Import failed: Unknown error',
        )
      }
    }

    revalidatePath(revalidatePathName)
  } catch (error) {
    console.error('Import error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to import employees',
    )
  }
}
