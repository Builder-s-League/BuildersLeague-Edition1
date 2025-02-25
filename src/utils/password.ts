export function generateSecurePassword(length = 12): string {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''

  // Ensure at least one of each character type
  password += charset.match(/[a-z]/)?.at(0) ?? 'a'
  password += charset.match(/[A-Z]/)?.at(0) ?? 'A'
  password += charset.match(/[0-9]/)?.at(0) ?? '1'
  password += charset.match(/[!@#$%^&*]/)?.at(0) ?? '!'

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}
