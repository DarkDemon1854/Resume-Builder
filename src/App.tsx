import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { useAuthSession } from '@/hooks/useAuthSession'
import ToastContainer from '@/components/Toast'
import ErrorBoundary from '@/components/ErrorBoundary'

function AppRoot() {
  useAuthSession()

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoot />
    </ErrorBoundary>
  )
}
