interface BottomNavProps {
  children: React.ReactNode
}

export default function BottomNavBar({ children }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 flex w-full  flex-row items-center justify-between border-t border-gray-900 bg-background px-4 py-4">
      {children}
    </nav>
  )
}
