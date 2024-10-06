import { z } from 'zod'
export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})
export type forgotPassword = z.infer<typeof forgotPasswordSchema>
