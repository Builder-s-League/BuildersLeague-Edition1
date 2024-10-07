'use client'

import React, { useState } from 'react'
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
  Menu,
} from 'lucide-react'

interface NavItemProps {
  label: string
  link: string
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  link,
  icon: Icon,
  onClick,
}) => (
  <Link href={link} onClick={onClick}>
    <Button
      variant="ghost"
      className="flex w-full items-center justify-start space-x-2"
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  </Link>
)

const CBHNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home (UGC)', link: '/cbh/about', icon: Home },
    // {
    //   label: 'Organizations',
    //   link: '/cbh/organization-dashboard',
    //   icon: Building2,
    // },
    { label: 'Report', link: '/cbh/report', icon: FileText },
    // { label: 'Feedback', link: '/cbh', icon: MessageSquare },
    { label: 'Schedule', link: '/cbh/schedule', icon: Calendar },
    { label: 'Survey', link: '/cbh/survey-dash', icon: ClipboardList },
    { label: 'Setting', link: '/cbh/setting', icon: Settings },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="sticky top-0 z-10 w-full bg-background shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="lg:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="hidden flex-grow items-center space-x-4 lg:flex">
            {navItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </div>
          <NavItem label="Log in/out" link="/" icon={LogIn} />
        </div>
        {isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-2 lg:hidden">
            {navItems.map((item) => (
              <NavItem key={item.label} {...item} onClick={toggleMenu} />
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default CBHNavBar
