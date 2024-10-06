import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface BottomNavItemProps {
  text: string
  page: string
  icon?: LucideIcon
}

export default function BottomNavBarItem({
  text,
  page,
  icon: Icon,
}: BottomNavItemProps) {
  return (
    <Link href={page} className="group flex flex-col items-center gap-2">
      {Icon && (
        <Icon className="h-4 w-4 text-gray-600 group-hover:text-white" />
      )}
      <p className="text-sm text-gray-600 group-hover:text-white">{text}</p>
    </Link>
  )
}
