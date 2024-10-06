import React from 'react'
import NavbarButton from './Narbar-button'

function HRNavBar() {
  return (
    <nav className="flex w-full items-center justify-between bg-gray-800 p-4">
      <div className="flex space-x-4">
        <NavbarButton label="Home (UGC)" link="/" />
        <NavbarButton label="Employees" link="/emp" />
        <NavbarButton label="Settings" link="/" />
      </div>
      <NavbarButton label="log in/log out" link="/hr/login" />
    </nav>
  )
}

export default HRNavBar
