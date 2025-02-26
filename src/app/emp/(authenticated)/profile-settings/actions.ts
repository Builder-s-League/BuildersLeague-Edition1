'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { ProfileSummary, ProfileUpdate } from '@/types/profile'
import { revalidatePath } from 'next/cache'

export default async function signOut() {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signOut()
    if (error) {
      return { error: error.message }
    }
    return { success: true }
  } catch (error) {
    return { error: 'An unexpected error occurred' }
  }
}

export async function getProfile(): Promise<ProfileSummary | null> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError) return null

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, email, contact_info, is_active, avatar_url')
    .eq('id', user?.id)
    .single()

  if (profileError) return null

  return profile
}

export async function updateProfile(data: ProfileUpdate) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError) throw new Error('Authentication error')

    // Validate inputs
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return { error: 'Please enter a valid email address' }
    }

    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        name: data.name,
        email: data.email,
        contact_info: data.contact_info,
      })
      .eq('id', user?.id)

    if (profileUpdateError) throw profileUpdateError

    revalidatePath('/emp/profile-settings')
    return { success: true }
  } catch (error) {
    console.error('Profile update error:', error)
    return {
      error:
        error instanceof Error ? error.message : 'Failed to update profile',
    }
  }
}

export async function updateProfileImage(fileData: {
  name: string
  type: string
  arrayBuffer: number[]
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError) throw new Error('Authentication error')

    // Get current profile to find existing image
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user?.id)
      .single()

    // Delete existing image if it exists
    if (currentProfile?.avatar_url) {
      try {
        // Extract the path after 'public/'
        const urlParts = currentProfile.avatar_url.split('CBH_ProfileImage/')
        if (urlParts.length > 1) {
          const oldPath = `${urlParts[1]}`
          console.log('Deleting old image:', oldPath)

          const { error: deleteError } = await supabase.storage
            .from('CBH_ProfileImage')
            .remove([oldPath])

          if (deleteError) {
            console.error('Error deleting old image:', deleteError)
          }
        }
      } catch (deleteError) {
        console.error('Error during old image deletion:', deleteError)
        // Continue with upload even if deletion fails
      }
    }

    // Validate and upload new file
    if (fileData.arrayBuffer.length > 5 * 1024 * 1024) {
      return { error: 'Image file is too large' }
    }

    const buffer = Buffer.from(fileData.arrayBuffer)
    const fileName = `${user?.id}/profile_${Date.now()}.${fileData.name.split('.').pop()}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('CBH_ProfileImage')
      .upload(fileName, buffer, {
        contentType: fileData.type,
        upsert: false, // Set to false to ensure we don't silently overwrite
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw uploadError
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('CBH_ProfileImage').getPublicUrl(fileName)

    if (!publicUrl) {
      throw new Error('Failed to get public URL')
    }

    // Update profile with new URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user?.id)

    if (updateError) throw updateError

    revalidatePath('/emp/profile-settings')
    return {
      success: true,
      url: publicUrl,
    }
  } catch (error) {
    console.error('Image upload error:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to upload image',
    }
  }
}
