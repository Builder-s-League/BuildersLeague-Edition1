import CBHNavBar from '@/components/NavBar/CBHNavbar'

export default function CBHLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CBHNavBar />
      {children}
    </>
  )
}
