import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Home,
  Building2,
  FileText,
  MessageSquare,
  Calendar,
  ClipboardList,
  Settings,
  LogIn,
} from 'lucide-react'

// Define the NavItemProps interface
interface NavItemProps {
  label: string
  link: string
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  > // Handle Lucide icons typing
}

// NavItem component
const NavItem: React.FC<NavItemProps> = ({ label, link, icon: Icon }) => (
  <Link href={link}>
    <Button variant="ghost" className="flex items-center space-x-2">
      <Icon className="h-5 w-5" />
      <span className="hidden md:inline">{label}</span>
    </Button>
  </Link>
)

// CBHNavBar component
const CBHNavBar: React.FC = () => {
  const navItems = [
    { label: 'Home (UGC)', link: '/', icon: Home },
    {
      label: 'Organizations',
      link: '/cbh/organization-dashboard',
      icon: Building2,
    },
    { label: 'Report', link: '/cbh/report', icon: FileText },
    { label: 'Feedback', link: '/feedback', icon: MessageSquare },
    { label: 'Schedule', link: '/cbh', icon: Calendar },
    { label: 'Survey', link: '/cbh/survey-dash', icon: ClipboardList },
    { label: 'Setting', link: '/cbh/setting', icon: Settings },
  ]

  return (
    <nav className="sticky top-0 z-10 w-full shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <div className="flex flex-grow flex-wrap items-center space-x-1 sm:space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
        <NavItem label="Log in/out" link="/cbh/login" icon={LogIn} />
      </div>
    </nav>
  )
}

export default CBHNavBar
