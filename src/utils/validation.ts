export type ValidationResult = {
  valid: boolean
  message: string
}

export const MIN_PASSWORD_LENGTH = 8

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) return { valid: false, message: 'Email is required' }
  if (!EMAIL_REGEX.test(email)) return { valid: false, message: 'Enter a valid email address' }
  return { valid: true, message: '' }
}

export function validateCurrentPassword(password: string): ValidationResult {
  if (!password) return { valid: false, message: 'Password is required' }
  if (password.length < MIN_PASSWORD_LENGTH) return { valid: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` }
  return { valid: true, message: '' }
}

export function validateNewPassword(password: string): ValidationResult {
  if (!password) return { valid: false, message: 'Password is required' }
  if (password.length < MIN_PASSWORD_LENGTH) return { valid: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` }
  if (!/[A-Z]/.test(password)) return { valid: false, message: 'Password must contain at least one uppercase letter' }
  if (!/[0-9]/.test(password)) return { valid: false, message: 'Password must contain at least one number' }
  return { valid: true, message: '' }
}

export function validateConfirmPassword(password: string, confirm: string): ValidationResult {
  if (!confirm) return { valid: false, message: 'Please confirm your password' }
  if (confirm !== password) return { valid: false, message: 'Passwords do not match' }
  return { valid: true, message: '' }
}

export function validateDisplayName(name: string): ValidationResult {
  if (!name.trim()) return { valid: false, message: 'Full name is required' }
  if (name.trim().length < 2) return { valid: false, message: 'Name must be at least 2 characters' }
  return { valid: true, message: '' }
}

export function passwordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  if (!password) return 0
  let score = 0
  if (password.length >= MIN_PASSWORD_LENGTH) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score as 0 | 1 | 2 | 3 | 4
}
