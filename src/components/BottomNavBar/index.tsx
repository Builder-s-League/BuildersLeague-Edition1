interface BottomNavProps {
  children: React.ReactNode
}

export default function BottomNavBar({ children }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 flex w-full  flex-row items-center justify-between border-t border-gray-200 bg-background px-12 py-4">
      {children}
    </nav>
  )
}
