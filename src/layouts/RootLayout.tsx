import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased">
      <Outlet />
    </div>
  )
}
