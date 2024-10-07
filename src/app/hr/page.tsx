import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HRPage() {
  const navItems = [
    { name: 'Login', href: 'cbh/about' },
    { name: 'Schedule', href: 'cbh/login' },
    { name: 'Settings', href: 'cbh/organization-dashboard' },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  text-black">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">HR Navigation</h1>
      <nav className="flex flex-wrap justify-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group relative flex items-center overflow-hidden rounded-lg border px-6 py-3 text-lg font-medium transition-all duration-300 ease-in-out "
          >
            {item.name}
            <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:opacity-100" />
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
