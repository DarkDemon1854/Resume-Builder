import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex-col-center text-center">
      <h1 className="text-6xl font-bold text-neutral-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <Link to={ROUTES.HOME} className="btn-base bg-primary-600 hover:bg-primary-500 px-6">
        Return to Home
      </Link>
    </div>
  )
}
