'use client'

import { ArrowLeftIcon } from 'lucide-react'
import MenuDrawer from '../MenuDrawer'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

const unallowedRoutes = ['']

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

      <div className="flex flex-row items-center space-x-4">
        <Image
          src="/cobh_logo/cbh_logo.svg"
          alt="Community of Big Hearts Logo"
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </div>
    </nav>
  )
}
