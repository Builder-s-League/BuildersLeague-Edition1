'use client'

import { ArrowLeftIcon } from 'lucide-react'
import MenuDrawer from '../MenuDrawer'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

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
      <Image
        src="/cobh_logo/COBH_Logo_Large.svg"
        alt="Community of Big Hearts Logo"
        width={300}
        height={300}
      />
    </nav>
  )
}
