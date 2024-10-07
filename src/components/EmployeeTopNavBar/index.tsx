'use client'

import { ArrowLeftIcon } from 'lucide-react'
import MenuDrawer from '../MenuDrawer'
import router from 'next/router'
import { usePathname } from 'next/navigation'

const unallowedRoutes = ['/notes', '/emp/profile-settings']

export function EmployeeTopNavBar() {
  const pathname = usePathname()
  const isUnallowedRoute = unallowedRoutes.includes(pathname)

  return (
    <nav className="flex w-full flex-row justify-between p-4">
      {!isUnallowedRoute ? (
        <MenuDrawer />
      ) : (
        <ArrowLeftIcon
          className="cursor-pointer"
          onClick={() => router.back()}
        />
      )}
      <button>Feedback</button>
    </nav>
  )
}
