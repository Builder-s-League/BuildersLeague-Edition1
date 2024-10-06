import BottomNavBar from '../BottomNavBar'
import BottomNavBarItem from '../BottomNavBarItem'

export default function EndBottomNavBar() {
  return (
    <BottomNavBar>
      <BottomNavBarItem text="Feed" page="/feed" />
      <BottomNavBarItem text="LMS" page="/lms" />
      <BottomNavBarItem text="Notes" page="/notes" />
      <BottomNavBarItem text="Profile" page="/profile" />
    </BottomNavBar>
  )
}
