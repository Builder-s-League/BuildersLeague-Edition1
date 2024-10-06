'use client'

import { React } from 'react'

const reportdashboard = () => {
  return (
    <div>
      <h1 className="absolute left-0 top-0 p-4">Report Dashboard</h1>
      <span className="absolute left-5 top-[5%] w-[20%] items-center justify-center rounded border-[1.5px] border-white bg-black p-4 text-white">
        <a href="" className="block text-center">
          Go back...
        </a>
      </span>
      <textarea
        className="absolute left-2 top-[12%] w-[35%] items-center justify-center rounded border-[1.5px] border-white bg-black p-[2.5px] text-white"
        name=""
        placeholder="search for content..."
        id=""
      ></textarea>
    </div>
  )
}
export default reportdashboard
