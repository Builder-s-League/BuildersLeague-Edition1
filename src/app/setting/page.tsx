import React from 'react'

const Setting: React.FC = () => {
  return (
    <div className="mt-[10rem] flex justify-between gap-10">
      {/* Main container with email/phone and buttons */}
      <div className="mb-4 flex flex-col justify-between px-10">
        {/* Email and phone section */}
        <div className="mt-10">
          <p className="text-3xl">email: example@example.com</p>
          <p className="text-3xl">phone number: 123-456-7890</p>
        </div>
        {/* Update button aligned to the left with increased margin left */}
        <button className="mt-[10rem] rounded bg-green-500 px-8 py-5 text-2xl text-white">
          Update Email and Phone
        </button>
      </div>

      {/* Buttons section */}
      <div className="mt-10 flex flex-col items-end space-y-3">
        <button className="w-full rounded bg-blue-500 px-8 py-5 text-2xl text-white">
          App Tour Change
        </button>
        <button className="w-full rounded bg-blue-500 px-8 py-5 text-2xl text-white">
          Storage Change
        </button>
        <button className="w-full rounded bg-blue-500 px-8 py-5 text-2xl text-white">
          App Domain Change
        </button>
      </div>
    </div>
  )
}

export default Setting
