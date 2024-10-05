import React from 'react'
import NavbarButton from './Narbar-button'

function CBHNavBar() {
  return (
    <nav className="flex w-full items-center justify-between bg-gray-800 p-4">
      <div className="flex flex-wrap space-x-4">
        <NavbarButton label="Home (UGC)" link="#" />
        <NavbarButton label="Organizations" link="#" />
        <NavbarButton label="Report" link="#" />
        <NavbarButton label="Feedback" link="#" />
        <NavbarButton label="Schedule" link="#" />
        <NavbarButton label="Survey" link="#" />
        <NavbarButton label="Setting" link="#" />
      </div>
      <NavbarButton label="log in/log out" link="#" />
    </nav>
  )
}

export default CBHNavBar
