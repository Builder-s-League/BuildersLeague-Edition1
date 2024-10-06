import BottomNavBar from '../BottomNavBar'
import BottomNavBarItem from '../BottomNavBarItem'
import { NotebookPen, Newspaper, Rss, UserRound } from 'lucide-react'

export default function EmployeeBottomNavBar() {
  return (
    <BottomNavBar>
      <BottomNavBarItem text="Feed" page="/feed" icon={Rss} />
      <BottomNavBarItem text="LMS" page="/lms" icon={NotebookPen} />
      <BottomNavBarItem text="Notes" page="/notes" icon={Newspaper} />
      <BottomNavBarItem text="Profile" page="/profile" icon={UserRound} />
    </BottomNavBar>
  )
}
