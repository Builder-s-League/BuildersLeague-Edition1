import BottomNavBar from '../BottomNavBar'
import BottomNavBarItem from '../BottomNavBarItem'
import { NotebookPen, Newspaper, Rss, UserRound } from 'lucide-react'

export default function EmployeeBottomNavBar() {
  return (
    <BottomNavBar>
      <BottomNavBarItem text="Feed" page="/emp/feed" icon={Rss} />
      <BottomNavBarItem text="LMS" page="/emp/lms" icon={NotebookPen} />
      <BottomNavBarItem text="Notes" page="/emp/notes" icon={Newspaper} />
      <BottomNavBarItem
        text="Profile"
        page="/emp/profile-settings"
        icon={UserRound}
      />
    </BottomNavBar>
  )
}
