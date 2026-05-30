import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'

export default function SignupPage() {
  return (
    <div className="card-base text-center">
      <h2 className="text-2xl font-bold text-gradient mb-6">Create Account</h2>
      <p className="text-neutral-400 mb-6">Signup form will go here</p>
      <Link to={ROUTES.HOME} className="text-primary-400 hover:text-primary-300 text-sm">
        Return to Home
      </Link>
    </div>
  )
}
