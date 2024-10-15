import BottomNavBar from '../BottomNavBar'
import BottomNavBarItem from '../BottomNavBarItem'
import { NotebookPen, Rss, UserRound, BookOpen } from 'lucide-react'

export default function EmployeeBottomNavBar() {
  return (
    <BottomNavBar>
      <BottomNavBarItem text="Feed" page="/emp/feed" icon={Rss} />
      <BottomNavBarItem text="Topics" page="/emp/topic" icon={BookOpen} />
      <BottomNavBarItem text="Notes" page="/emp/notes" icon={NotebookPen} />
      <BottomNavBarItem
        text="Profile"
        page="/emp/profile-settings"
        icon={UserRound}
      />
    </BottomNavBar>
  )
}
