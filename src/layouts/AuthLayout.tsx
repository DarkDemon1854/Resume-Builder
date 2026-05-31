import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased flex-center">
      <div className="w-full max-w-md px-4">
        <Outlet />
      </div>
    </div>
  )
}
