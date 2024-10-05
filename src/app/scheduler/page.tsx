'use client'

import React from 'react'

const SchedulePage = () => {
  return (
    <div className="container mx-auto h-screen px-4 py-8">
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded bg-white p-4 shadow ">
          <h2 className="mb-2 text-xl font-semibold text-black">Releases</h2>
          <div className="flex-grow space-y-2">
            <p className="text-black">August 8, 2024 - Content 1 -></p>
            <p className="text-black">August 8, 2024 - Content 2 -></p>
            <p className="text-black">August 8, 2024 - Content 3 -></p>
            <p className="text-black">August 8, 2024 - Content 4 -></p>
            <p className="text-black"><a href="#">Add new +</a></p>

          </div>
          <div className="mt-4 flex justify-items-end flex-grow top-[100%]">
            <button className="rounded bg-black px-4 py-2 text-white">Delete selected release</button></div>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">Column 2</h2>
          <div className="outline-black bg-black rounded-[10%] flex h-[150px]">
            <h2 className="ml-[41%] justify-center items-center flex-auto">August</h2>
            <div className=" border-[1.5px] border-white rounded-[15%] bg-black mt-[33%] mb-7 mr-10"><a href="#">30</a></div>


          </div>
        </div>
        <div className="flex h-full flex-col rounded bg-white p-4 text-black shadow">
          <h2 className="mb-2 text-xl font-semibold">Content</h2>
          <ul className="flex-grow list-disc pl-5">
            <li>Content 1</li>
            <li>Content 2</li>
            <li>Content 3</li>
            <li>Content 4</li>
            <li>...</li>
          </ul>
        </div>
        <div className="flex h-full flex-col rounded bg-white p-4 text-black shadow">
          <h2 className="mb-2 text-xl font-semibold">Companies</h2>
          <div className="flex-grow space-y-2">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Company A</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>B</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>C</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="rounded bg-green-600 px-4 py-2 text-white">
              Save
            </button>
            <button className="rounded bg-gray-600 px-4 py-2 text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
