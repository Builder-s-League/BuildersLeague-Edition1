'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createServerClient } from '@/utils/supabase'

export async function login(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: loginData, error } =
    await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  if (loginData?.session) {
    revalidatePath('/', 'layout')
    redirect('/')
  }
}
