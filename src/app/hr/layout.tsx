import HRNavBar from '@/components/NavBar/HRNavbar'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HRNavBar />
      {children}
    </>
  )
}
