import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { useAuthSession } from '@/hooks/useAuthSession'

function AppRoot() {
  useAuthSession()
  return <RouterProvider router={router} />
}

export default AppRoot
