import Link from 'next/link'

export default function Employee() {
  return (
    <div className="flex h-screen h-screen w-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Welcome, Employee!
      </h1>
      <div className="flex flex-col gap-4">
        <Link
          href="/resources"
          className="rounded-lg px-4 py-2 text-lg text-blue-600 shadow-md transition-colors duration-300 hover:text-blue-800 hover:shadow-lg"
        >
          Resources
        </Link>
        <Link
          href="/settings"
          className="rounded-lg px-4 py-2 text-lg text-blue-600 shadow-md transition-colors duration-300 hover:text-blue-800 hover:shadow-lg"
        >
          Profile Settings
        </Link>
      </div>
    </div>
  )
}
