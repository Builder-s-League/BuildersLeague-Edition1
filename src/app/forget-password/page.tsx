'use client'

import { React } from 'react'
import Link from 'next/link'

const forgetpassword = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="absolute right-4 top-4">
        <h2>
          <Link href="/login">login </Link>/<Link href="/logout"> log out</Link>
        </h2>
      </div>
      <div className="flex items-center justify-center rounded-lg border border-white bg-black p-4 ">
        A new password has been sent to your email.
      </div>
      <div className="flex w-[30%] justify-center rounded-lg border border-white bg-black p-3">
        <Link href="#">log in</Link>
      </div>
    </div>
  )
}
export default forgetpassword
