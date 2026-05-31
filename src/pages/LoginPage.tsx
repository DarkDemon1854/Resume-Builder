import { useState, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'
import { validateEmail, validateCurrentPassword } from '@/utils/validation'
import { resolveFirebaseError } from '@/utils/firebaseErrors'
import Button from '@/components/Button'
import Input from '@/components/Input'
import EyeIcon from '@/components/EyeIcon'

type FormState = {
  email: string
  password: string
}

type FormErrors = Partial<FormState>

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  const emailResult = validateEmail(values.email)
  const passwordResult = validateCurrentPassword(values.password)
  if (!emailResult.valid) errors.email = emailResult.message
  if (!passwordResult.valid) errors.password = passwordResult.message
  return errors
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromState = location.state as { from?: { pathname: string } } | null
  const from = fromState?.from?.pathname ?? ROUTES.DASHBOARD

  const setUser = useAuthStore((s) => s.setUser)
  const setStatus = useAuthStore((s) => s.setStatus)
  const setError = useAuthStore((s) => s.setError)
  const storeError = useAuthStore((s) => s.error)
  const clearError = useAuthStore((s) => s.clearError)
  const isLoading = useAuthStore((s) => s.status) === 'loading'

  const [values, setValues] = useState<FormState>({ email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setValues((prev) => ({ ...prev, [field]: value }))
        if (touched[field]) {
          const next = { ...values, [field]: value }
          const errs = validate(next)
          setErrors((prev) => ({ ...prev, [field]: errs[field] }))
        }
        if (storeError) clearError()
      },
    [touched, values, storeError, clearError]
  )

  const handleBlur = useCallback(
    (field: keyof FormState) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      const errs = validate(values)
      setErrors((prev) => ({ ...prev, [field]: errs[field] }))
    },
    [values]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('loading')
    try {
      const user = await authService.login(values.email, values.password)
      setUser(user)
      navigate(from, { replace: true })
    } catch (err) {
      setError(resolveFirebaseError(err))
    }
  }

  return (
    <div>
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
              d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-50">Welcome back</h1>
        <p className="text-neutral-400 text-sm mt-1">Sign in to your ResumeCraft account</p>
      </div>

      <div className="card-base">
        {storeError && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-lg bg-danger-500/10 border border-danger-500/30 text-danger-400 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 shrink-0 mt-0.5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            {storeError}
          </div>
        )}

        <form onSubmit={(e) => { void handleSubmit(e) }} noValidate className="flex flex-col gap-5">
          <Input
            id="login-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            leftAddon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
              </svg>
            }
          />

          <Input
            id="login-password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            leftAddon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
            }
            rightAddon={
              <button
                type="button"
                onClick={() => { setShowPassword((v) => !v) }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <EyeIcon open={showPassword} />
              </button>
            }
          />

          <div className="flex justify-end -mt-2">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button id="login-submit" type="submit" variant="primary" fullWidth loading={isLoading}>
            Sign in
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-neutral-400 mt-6">
        Don&apos;t have an account?{' '}
        <Link
          to={ROUTES.SIGNUP}
          className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Create one free
        </Link>
      </p>
    </div>
  )
}
