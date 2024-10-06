import React from 'react'
import NavbarButton from './Narbar-button'

function CBHNavBar() {
  return (
    <nav className="flex w-full items-center justify-between bg-gray-800 p-4">
      <div className="flex flex-wrap space-x-4">
        <NavbarButton label="Home (UGC)" link="/" />
        <NavbarButton
          label="Organizations"
          link="/cbh/organization-dashboard"
        />
        <NavbarButton label="Report" link="/cbh/report" />
        <NavbarButton label="Feedback" link="/cbh/feedback" />
        <NavbarButton label="Schedule" link="/cdh/schedule" />
        <NavbarButton label="Survey" link="/cbh/survey" />
        <NavbarButton label="Setting" link="/cbh/setting" />
      </div>
      <NavbarButton label="log in/log out" link="/cbh/login" />
    </nav>
  )
}

export default CBHNavBar
