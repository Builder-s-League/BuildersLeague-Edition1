import Link from 'next/link'

export default function PasswordResetPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="max-w-m w-full p-8">
        <p className="mb-4 text-lg">
          A new password has been sent to your email.
        </p>
        <div className="flex justify-center">
          <Link href="/login">
            <button className="animate-pulse rounded-md bg-green-700 px-6 py-2 text-white">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
