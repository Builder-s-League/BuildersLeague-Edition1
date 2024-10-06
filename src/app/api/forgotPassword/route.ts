import { forgotPasswordSchema } from '../../../schemas/forgotPasswordSchema'
import { supabase } from '../../../../supabase'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
export async function POST(req: Request) {
  try {
    // Parse the request body as JSON
    const { email } = await req.json()
    const { error } = forgotPasswordSchema.safeParse({ email }) // Validate the request body using Zod
    if (error) {
      return new Response(
        JSON.stringify({
          error: 'Please enter a valid email',
          e: error.issues,
        }),
        { status: 411 },
      )
    }
    if (!supabase) throw new Error('Supabase client is not initialized')

    // get userin the database
    const { data: UserData, error: userError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email)
      .limit(1)
      .single()
    // Use .single() to expect a single user or null

    if (userError || !UserData) {
      throw new Error('No email found in our records')
    }
    const newPassword = generateRandomPassword()
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    // Send a password reset email
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password: hashedPassword,
      })
      .eq('id', UserData.id)

    if (updateError) throw new Error('Something went wrong') // Throw an error if the reset password request fails

    //Send password in Email

    // Success response
    return new Response(
      JSON.stringify({ message: 'Password reset email sent' }),
      { status: 200 },
    )
  } catch (err) {
    // Error response
    return new Response(
      JSON.stringify({
        error:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      }),
      { status: 400 },
    )
  }
}
const generateRandomPassword = () => {
  return uuidv4().slice(0, 8) // Simple random password, adjust as necessary
}
