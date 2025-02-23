import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Users, Settings, LogIn, Calendar } from 'lucide-react'

// Define an interface for NavItem props
interface NavItemProps {
  label: string
  link: string
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  > // Adjusted type for the icon
}

const NavItem: React.FC<NavItemProps> = ({ label, link, icon: Icon }) => (
  <Link href={link}>
    <Button variant="ghost" className="flex items-center space-x-2">
      <Icon className="h-5 w-5" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  </Link>
)

const HRNavBar: React.FC = () => {
  const navItems = [
    { label: 'Home (UGC)', link: '/hr/about', icon: Home },
    { label: 'Employees', link: '/hr/employee', icon: Users },
    { label: 'Settings', link: '/hr/settings', icon: Settings },
  ]

  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
        <NavItem label="Log in/out" link="/" icon={LogIn} />
      </div>
    </nav>
  )
}

export default HRNavBar
