'use client'

import { ArrowLeftIcon } from 'lucide-react'
import MenuDrawer from '../MenuDrawer'
import router from 'next/router'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const unallowedRoutes = ['/emp/notes', '/emp/profile-settings']

export function EmployeeTopNavBar() {
  const pathname = usePathname()
  const isUnallowedRoute = unallowedRoutes.includes(pathname)
  const router = useRouter()

  return (
    <nav className="flex w-full flex-row justify-between p-4">
      {!isUnallowedRoute ? (
        <MenuDrawer />
      ) : (
        <ArrowLeftIcon className="cursor-pointer" onClick={router.back} />
      )}
      <Link href="/feedback">
        <button>Feedback</button>
      </Link>
    </nav>
  )
}
