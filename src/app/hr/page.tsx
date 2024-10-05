import Link from 'next/link'

export default function HRPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">HR Navigation</h1>
      <div className="flex gap-4">
        <Link href="/hr/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        </Link>
        <Link href="/hr/schedule">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Schedule</button>
        </Link>
        <Link href="/hr/settings">
          <button className="px-4 py-2 bg-red-500 text-white rounded">Settings</button>
        </Link>
      </div>
    </div>
  )
}
