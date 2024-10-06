'use client'

import { Button } from '../ui/button'
import { logout } from './actions'

export function LogoutButton() {
  return (
    <Button
      className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground"
      onClick={() => logout()}
    >
      Logout
    </Button>
  )
}
