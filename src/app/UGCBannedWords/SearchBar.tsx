import React, { useState } from 'react'
import { Search } from 'lucide-react'

function SearchBar() {
  return (
    <form className="mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value="test"
          className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500 hover:text-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
