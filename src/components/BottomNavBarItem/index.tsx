import Link from 'next/link'

interface BottomNavItemProps {
  text: string
  page: string
}

export default function BottomNavBarItem({ text, page }: BottomNavItemProps) {
  return (
    <Link href={page}>
      <p className="text-sm text-blue-700">{text}</p>
    </Link>
  )
}
