import React from 'react'
import { redirect } from 'next/navigation'

export default function OrgDashboard() {
  const allowedUser = 'CBH'
  const currentUser = 'CBH'
  if (currentUser != allowedUser) {
    redirect('/')
  }
  return (
    <div className="container mx-auto p-4">
      <div className="mb-3 grid grid-flow-col grid-cols-3 gap-4">
        <input
          className="col-span-2 rounded-lg border p-2 text-center"
          placeholder="Search organization..."
        />
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="rounded bg-blue-500 p-2 text-center">
            Add
          </a>
          <a href="#" className="rounded bg-blue-500 p-2 text-center">
            Export
          </a>
        </div>
      </div>

      {['Org 1', 'Org 2', 'Org 3'].map((org, idx) => (
        <div key={idx} className="mb-4 grid grid-cols-4 gap-4 p-4">
          <div className="col-span-3 content-center rounded border text-center text-lg">
            {org}
          </div>
          <div className="flex flex flex-col gap-2">
            <a href="#" className="rounded bg-green-500 p-2 text-center">
              Edit Org
            </a>
            <a href="#" className="rounded bg-yellow-500 p-2 text-center">
              Edit Members
            </a>
          </div>
        </div>
      ))}

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
