import bcrypt from 'bcryptjs'
export async function validatePassword(
  password: string,
  orignalPassword: string,
): Promise<{ success: boolean }> {
  const passwordValidation = await bcrypt.compare(password, orignalPassword)

  if (!passwordValidation) {
    return { success: false }
  } else {
    return { success: true }
  }
}
