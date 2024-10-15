import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'

interface LoginFormProps {
  forgotPasswordRoute: string
  routeOnSubmit: string
}

export default function LoginForm({
  forgotPasswordRoute,
  routeOnSubmit,
}: LoginFormProps) {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <p className="text-center text-sm text-muted-foreground">
          Welcome back! Please sign in to your account.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-4">
        <form className="gap-z flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
          <Label className="text-md" htmlFor="email" />
          <Input name="email" placeholder="you@example.com" required />
          <Label className="text-md" htmlFor="password" />
          <Input
            name="password"
            type="password"
            required
            placeholder="*******"
          />
          <Link href={routeOnSubmit}>
            <Button className="my-2 w-full">Sign In</Button>
          </Link>
          {/* <Link href={forgotPasswordRoute}>
            <p className="text-sm text-blue-700">Forgot the password?</p>
          </Link> */}
        </form>
      </CardContent>
    </Card>
  )
}
