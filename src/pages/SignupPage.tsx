import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'
import Button from '@/components/Button'
import Input from '@/components/Input'

type FormState = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type FormErrors = Partial<FormState>

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Full name is required'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Password must contain at least one uppercase letter'
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Password must contain at least one number'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

function PasswordStrengthBar({ password }: { password: string }) {
  const strength = (() => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  })()

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', 'bg-danger-500', 'bg-warning-500', 'bg-primary-500', 'bg-success-500']
  const textColors = [
    '',
    'text-danger-400',
    'text-warning-400',
    'text-primary-400',
    'text-success-400',
  ]

  if (!password) return null

  return (
    <div className="flex flex-col gap-1.5 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={[
              'h-1 flex-1 rounded-full transition-all duration-300',
              i <= strength ? colors[strength] : 'bg-neutral-800',
            ].join(' ')}
          />
        ))}
      </div>
      {strength > 0 && (
        <p className={`text-xs ${textColors[strength]}`}>{labels[strength]}</p>
      )}
    </div>
  )
}

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  )

export default function SignupPage() {
  const navigate = useNavigate()
  const { setUser, setLoading, setError, isLoading, error: storeError, clearError } = useAuthStore()

  const [values, setValues] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})

  const handleChange = useCallback(
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setValues(prev => ({ ...prev, [field]: value }))
      if (touched[field]) {
        const next = { ...values, [field]: value }
        const errs = validate(next)
        setErrors(prev => ({ ...prev, [field]: errs[field] }))
      }
      if (storeError) clearError()
    },
    [touched, values, storeError, clearError]
  )

  const handleBlur = useCallback(
    (field: keyof FormState) => () => {
      setTouched(prev => ({ ...prev, [field]: true }))
      const errs = validate(values)
      setErrors(prev => ({ ...prev, [field]: errs[field] }))
    },
    [values]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 900))
      setUser({
        id: crypto.randomUUID(),
        email: values.email,
        name: values.name.trim(),
        createdAt: new Date().toISOString(),
      })
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch {
      setError('Failed to create account. Please try again.')
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-primary-600 flex-center mx-auto mb-4 shadow-glow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-50">Create your account</h1>
        <p className="text-neutral-400 text-sm mt-1">Start building stunning resumes today</p>
      </div>

      <div className="card-base">
        {storeError && (
          <div
            role="alert"
            className="mb-5 px-4 py-3 rounded-lg bg-danger-500/10 border border-danger-500/30 text-danger-400 text-sm"
          >
            {storeError}
          </div>
        )}

        <form onSubmit={(e) => { void handleSubmit(e) }} noValidate className="flex flex-col gap-5">
          <Input
            id="signup-name"
            label="Full name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            value={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            error={errors.name}
            leftAddon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
            }
          />

          <Input
            id="signup-email"
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

          <div>
            <Input
              id="signup-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
              leftAddon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              rightAddon={
                <button
                  type="button"
                  onClick={() => { setShowPassword(v => !v) }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              }
            />
            <PasswordStrengthBar password={values.password} />
          </div>

          <Input
            id="signup-confirm-password"
            label="Confirm password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={errors.confirmPassword}
            leftAddon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clipRule="evenodd"
                />
              </svg>
            }
            rightAddon={
              <button
                type="button"
                onClick={() => { setShowConfirm(v => !v) }}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <EyeIcon open={showConfirm} />
              </button>
            }
          />

          <Button
            id="signup-submit"
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
          >
            Create account
          </Button>
        </form>
      </div>

      <p className="text-center text-sm text-neutral-400 mt-6">
        Already have an account?{' '}
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
