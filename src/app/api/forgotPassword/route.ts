import { forgotPasswordSchema } from '../../../schemas/forgotPasswordSchema'
import { supabase } from '../../../../supabase'

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

    // Send the password reset email using Supabase's built-in auth method
    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(email)

    if (resetError) {
      throw new Error('No email found in our records or an error occurred')
    }

    // Success response
    return new Response(
      JSON.stringify({ message: 'Password reset email sent successfully' }),
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
