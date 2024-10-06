'use client'

import { ArrowLeftIcon } from 'lucide-react'
import MenuDrawer from '../MenuDrawer'
import router from 'next/router'
import { usePathname } from 'next/navigation'

const allowedRoutes = ['/feed', '/lms']
const noArrowRoutes = ['/notes', '/emp/profile-settings']

export function EmployeeTopNavBar() {
  const pathname = usePathname()
  const isAllowedRoute = allowedRoutes.includes(pathname)
  const isNoArrowRoute = noArrowRoutes.includes(pathname)

  console.log(pathname)
  return (
    <nav className="flex w-full flex-row justify-between p-4">
      {isAllowedRoute ? (
        <MenuDrawer />
      ) : (
        !isNoArrowRoute && (
          <ArrowLeftIcon
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        )
      )}
      <button>Feedback</button>
    </nav>
  )
}
