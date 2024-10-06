import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center px-8 sm:max-w-md">
      <Link
        href="/"
        className="group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Login</h2>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="flex flex-col gap-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              required
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
            <Button asChild variant="link">
              <Link href="/forgot-password">Forgot Password?</Link>
            </Button>
            <Button type="submit" className="bg-green-700">
              Sign In
            </Button>
            {searchParams?.message && (
              <p className="mt-4 text-center text-red-500">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
