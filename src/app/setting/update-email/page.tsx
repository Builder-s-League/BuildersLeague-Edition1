'use client'

import React from 'react'

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
        <button className="mt-24 rounded bg-green-500 px-8 py-5 text-2xl text-white">
          Update
        </button>
      </div>

      {/* Buttons section */}
      <div className="flex flex-col space-y-3">
        <button className="w-full rounded bg-blue-500 px-8 py-5 text-2xl text-white">
          Test Account Info
        </button>
        <button className="w-full rounded bg-blue-500 px-8 py-5 text-2xl text-white">
          Contact Us
        </button>

        {/* Feedback button placed below the stacked buttons */}
        <button className="w-full rounded bg-blue-500 px-8 py-5 text-2xl text-white">
          Feedback
        </button>
      </div>
    </div>
  )
}

export default Setting
