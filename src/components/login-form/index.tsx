import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LoginForm({
  forgotPasswordRoute,
}: {
  forgotPasswordRoute: string
}) {
  return (
    <form className="gap-z flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
      <Label className="text-md" htmlFor="email" />
      <Input name="email" placeholder="you@example.com" required />
      <Label className="text-md" htmlFor="password" />
      <Input name="password" type="password" required placeholder="*******" />
      <Button className="my-2">Sign In</Button>

      {/* Use the passed prop to dynamically link to the appropriate reset password page */}
      <Link href={forgotPasswordRoute}>
        <p className="text-sm text-blue-700">Forgot the password?</p>
      </Link>
    </form>
  )
}
