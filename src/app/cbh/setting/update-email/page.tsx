'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

const Setting: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      {' '}
      {/* Center the entire container */}
      <div className="flex flex-col justify-start space-y-4 px-10">
        {' '}
        {/* Use space-y-4 for spacing between elements */}
        {/* Email input section */}
        <div className="mt-10">
          <p className="mb-2 text-sm text-gray-400">
            *Leave blank to not update
          </p>
          <input
            className="rounded border-2 border-white px-4 py-2 text-lg"
            placeholder="Enter New Email"
          />
        </div>
        <div>
          <input
            className="rounded border-2 border-white px-4 py-2 text-lg"
            placeholder="Enter New Phone"
          />
        </div>
        {/* Update button aligned to the left */}
        <Button variant="outline" className="w-full">
          Update
        </Button>
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
    </div>
  )
}

export default Setting
