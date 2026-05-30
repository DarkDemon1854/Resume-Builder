import { useAuthStore } from '@/store/authStore'

export default function DashboardPage() {
  const logout = useAuthStore(state => state.logout)

  return (
    <div className="container-app py-8">
      <div className="flex-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={logout} className="btn-base bg-neutral-800 hover:bg-neutral-700 px-4">
          Logout
        </button>
      </div>
      <div className="card-base">
        <p className="text-neutral-400">Dashboard content will go here</p>
      </div>
    </div>
  )
}
