import Link from 'next/link'

const MainDashboard: React.FC<{ isSupabaseConnected: boolean }> = ({
  isSupabaseConnected,
}) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">Navigation</h1>
      <div className="flex gap-4">
        <Link href="/cbh">
          <button className="rounded bg-blue-500 px-4 py-2 text-white">
            CBH
          </button>
        </Link>
        <Link href="/hr">
          <button className="rounded bg-green-500 px-4 py-2 text-white">
            HR
          </button>
        </Link>
        <Link href="/emp">
          <button className="rounded bg-red-500 px-4 py-2 text-white">
            Employees
          </button>
        </Link>
      </div>

      {/* Optionally, show Supabase connection status */}
      {isSupabaseConnected ? (
        <p className="mt-8 text-green-600">Supabase is connected!</p>
      ) : (
        <p className="mt-8 text-red-600">Supabase is not connected.</p>
      )}
    </div>
  )
}

export default MainDashboard
