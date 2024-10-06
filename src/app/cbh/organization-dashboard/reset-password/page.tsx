'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdate = () => {
    // Implement password update logic here
    console.log('Password update requested')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="flex justify-end space-x-2 p-4">
        <button className="rounded border px-2 py-1">add</button>
        <button className="rounded border px-2 py-1">export</button>
      </div>

      <div className="flex flex-grow flex-col items-center justify-center space-y-4 px-4">
        <input
          type="password"
          placeholder="New Password"
          className="w-full max-w-md rounded border bg-black p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full max-w-md rounded border bg-black p-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="space-x-4">
          <button className="rounded border px-4 py-2" onClick={handleUpdate}>
            Update
          </button>
          <Link href="/cbh/organization-dashboard">
            <button className="rounded border px-4 py-2">Discard</button>
          </Link>
        </div>
      </div>

      <div className="mt-6 flex justify-around rounded border p-4">
        <a href="#" className="rounded bg-gray-500 p-2 text-white">
          OM
        </a>
        <a href="#" className="rounded bg-gray-500 p-2 text-white">
          OGC
        </a>
        <a href="#" className="rounded bg-gray-500 p-2 text-white">
          C
        </a>
        <a href="#" className="rounded bg-gray-500 p-2 text-white">
          FB
        </a>
        <a href="#" className="rounded bg-gray-500 p-2 text-white">
          S
        </a>
      </div>
    </div>
  )
}
