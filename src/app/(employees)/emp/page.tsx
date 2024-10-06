import Link from 'next/link'

export default function Employee() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Navigation</h1>
      <div className="flex gap-4">
        <Link href="/emp/resources">
          <button className="bg-blue-500 px-4 py-2 text-white">
            Resources
          </button>
        </Link>
        <Link href="/emp/notes">
          <button className="bg-blue-500 px-4 py-2 text-white">Notes</button>
        </Link>
        <Link href="/emp/profile-settings">
          <button className="bg-blue-500 px-4 py-2 text-white">Settings</button>
        </Link>
      </div>
    </div>
  )
}
