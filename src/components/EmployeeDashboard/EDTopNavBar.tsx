'use client'

import BackButton from './BackButton'

export default function EDTopNavBar() {
  return (
    <div className="mb-4 border-b bg-background/95">
      <div className="container flex h-16 items-center px-4">
        <BackButton />
      </div>
    </div>
  )
}
