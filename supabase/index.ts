// Singleton pattern
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string

let supabase: SupabaseClient | null = null

if (!supabase) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
