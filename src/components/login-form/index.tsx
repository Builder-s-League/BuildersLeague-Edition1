import Link from 'next/link'

export default function LoginForm() {
  return (
    <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground">
        Sign In
      </button>
      <Link href="">
        <p className="text-sm text-blue-700">Forgot the password?</p>
      </Link>
    </form>
  )
}
