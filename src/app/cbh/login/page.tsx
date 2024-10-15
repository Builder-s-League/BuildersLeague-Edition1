import LoginForm from '@/components/login-form'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function EmployeeLogin() {
  return (
    <div className="flex h-screen w-full flex-col gap-2 p-4 sm:max-w-md ">
      <Link href="/">
        <Button variant="outline" size="icon">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <div className="flex h-full flex-col justify-center gap-2">
        <LoginForm
          forgotPasswordRoute={'/cbh/forget-password'}
          routeOnSubmit={'/cbh/about'}
        />
      </div>
    </div>
  )
}
