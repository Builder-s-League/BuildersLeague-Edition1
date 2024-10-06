// Singleton pattern
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export { supabase }
