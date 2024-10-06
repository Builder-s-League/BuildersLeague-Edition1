import Link from 'next/link'

export default function HRPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">HR Navigation</h1>
      <div className="flex gap-4">
        <Link href="/hr/login">
          <button className="rounded bg-blue-500 px-4 py-2 text-white">
            Login
          </button>
        </Link>
        <Link href="/hr/schedule">
          <button className="rounded bg-green-500 px-4 py-2 text-white">
            Schedule
          </button>
        </Link>
        <Link href="/hr/settings">
          <button className="rounded bg-red-500 px-4 py-2 text-white">
            Settings
          </button>
        </Link>
      </div>
    </div>
  )
}
