'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

const Setting: React.FC = () => {
  return (
    <div className="mt-[10rem] flex h-screen justify-between gap-10">
      {/* Main container with email/phone and buttons */}
      <div className="mb-4 flex flex-col justify-start px-10">
        {/* Email input section */}
        <div className="mt-10">
          <input
            className="rounded border-2 border-white px-4 py-2 text-lg"
            placeholder="Enter email"
          />
        </div>

        {/* Update button aligned to the left */}
        <Button variant="outline" className="w-full">
          Update
        </Button>
      </div>

      {/* Buttons section */}
      <div className="flex flex-col space-y-3">
        <Button variant="outline" className="w-full">
          Test Account Info
        </Button>
        <Button variant="outline" className="w-full">
          Contact Us
        </Button>

        {/* Feedback button placed below the stacked buttons */}
        <Button variant="outline" className="w-full">
          Feedback
        </Button>
      </div>
    </div>
  )
}

export default Setting
