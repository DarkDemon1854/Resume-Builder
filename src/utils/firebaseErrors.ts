import { MIN_PASSWORD_LENGTH } from '@/utils/validation'

const FIREBASE_ERROR_MAP: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/operation-not-allowed': 'This sign-in method is not currently enabled.',
  'auth/weak-password': `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please check and try again.',
  'auth/too-many-requests': 'Too many failed attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Please check your internet connection.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled before completing.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  'auth/requires-recent-login': 'For security, please sign in again to continue.',
  'auth/account-exists-with-different-credential':
    'An account with this email exists using a different sign-in method.',
  'auth/missing-email': 'An email address is required.',
  'auth/expired-action-code': 'This reset link has expired. Please request a new one.',
  'auth/invalid-action-code': 'This reset link is invalid. Please request a new one.',
  'auth/missing-password': 'A password is required.',
}

export function resolveFirebaseError(error: unknown): string {
  if (error instanceof Error) {
    const code = (error as Error & { code?: string }).code ?? ''
    return FIREBASE_ERROR_MAP[code] ?? (error.message || 'An unexpected error occurred. Please try again.')
  }
  return 'An unexpected error occurred. Please try again.'
}
