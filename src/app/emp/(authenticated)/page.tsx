import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Notebook, Settings } from 'lucide-react'

export default function EmployeeNavigation() {
  const navItems = [
    { name: 'Resources', href: '/emp/', icon: BookOpen },
    { name: 'Notes', href: '/emp/notes', icon: Notebook },
    { name: 'Settings', href: '/emp/profile-settings', icon: Settings },
  ]

  return (
    <div className="flex  flex-col items-center justify-center  from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Employee Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  className="w-full justify-start text-lg"
                  variant="outline"
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
