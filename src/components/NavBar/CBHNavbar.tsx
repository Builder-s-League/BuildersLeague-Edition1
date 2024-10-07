'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
}

const NavItem: React.FC<NavItemProps> = ({ label, link, icon: Icon }) => (
  <Link href={link} className="w-full">
    <Button variant="ghost" className="w-full justify-start">
      <Icon className="mr-2 h-5 w-5" />
      <span>{label}</span>
    </Button>
  </Link>
)

export default function CBHNavBar() {
  const [isOpen, setIsOpen] = useState(false)

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
    <nav className="sticky top-0 z-10 w-full bg-background shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <NavItem {...item} />
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <NavItem label="Log in/out" link="/cbh/login" icon={LogIn} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden lg:flex lg:flex-grow lg:items-center lg:justify-center lg:space-x-4">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
        <div className="hidden lg:block">
          <NavItem label="Log in/out" link="/cbh/login" icon={LogIn} />
        </div>
      </div>
    </nav>
  )
}
