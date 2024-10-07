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
        src="/cobh_logo/COBH_Logo_Large.svg" // Update with your image path
        alt="Description of image" // Provide an alt text for accessibility
        width={300} // Specify width
        height={300} // Specify height
        className="object-contain" // Optional: adjust image fit
      />
    </nav>
  )
}
