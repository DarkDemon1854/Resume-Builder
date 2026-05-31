import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '@/services/authService'
import { ROUTES } from '@/constants'
import { validateEmail } from '@/utils/validation'
import { resolveFirebaseError } from '@/utils/firebaseErrors'
import { toast } from '@/store/toastStore'
import Button from '@/components/Button'
import Input from '@/components/Input'

type Stage = 'form' | 'sent'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [stage, setStage] = useState<Stage>('form')
  const [isLoading, setIsLoading] = useState(false)

  const validate = useCallback((value: string): string => {
    const result = validateEmail(value)
    return result.valid ? '' : result.message
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      if (emailError) setEmailError(validate(e.target.value))
    },
    [emailError, validate]
  )

  const handleBlur = useCallback(() => {
    setEmailError(validate(email))
  }, [email, validate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate(email)
    if (err) {
      setEmailError(err)
      return
    }
    setIsLoading(true)
    try {
      await authService.sendPasswordReset(email)
      setStage('sent')
    } catch (err) {
      toast.error(resolveFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  if (stage === 'sent') {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full bg-success-500/15 border border-success-500/30 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8 text-success-400"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-50 mb-2">Check your inbox</h1>
        <p className="text-neutral-400 text-sm mb-1">We sent a password reset link to</p>
        <p className="text-primary-400 font-medium text-sm mb-8">{email}</p>
        <p className="text-xs text-neutral-500 mb-6">
          Didn&apos;t receive it? Check your spam folder or{' '}
          <button
            type="button"
            onClick={() => { setStage('form') }}
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            try another email
          </button>
        </p>
        <Link
          to={ROUTES.LOGIN}
          className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          ← Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center mx-auto mb-4 shadow-glow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-50">Forgot password?</h1>
        <p className="text-neutral-400 text-sm mt-1">
          Enter your email and we&apos;ll send a reset link
        </p>
      </div>

      <div className="card-base">
        <form onSubmit={(e) => { void handleSubmit(e) }} noValidate className="flex flex-col gap-5">
          <Input
            id="forgot-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={emailError}
            leftAddon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
            }
          />

          <Button
            id="forgot-submit"
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
          >
            Send reset link
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-neutral-400 mt-6">
        Remembered your password?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
