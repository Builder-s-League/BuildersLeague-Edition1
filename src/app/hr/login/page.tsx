import LoginForm from '@/components/login-form'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function HRLoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col gap-2 p-4 sm:max-w-md ">
      <Link href="/" className="self-start">
        <Button variant="outline" size="icon">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <div className="flex h-full flex-col items-center justify-center gap-2">
        <LoginForm
          forgotPasswordRoute={'/hr/forgetPassword'}
          routeOnSubmit={'/hr/about'}
        />
      </div>
    </div>
  )
}
