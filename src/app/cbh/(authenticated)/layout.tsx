import CBHNavBar from '@/components/NavBar/CBHNavbar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CBHNavBar />
      {children}
    </>
  )
}
