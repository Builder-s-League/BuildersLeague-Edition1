import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function OrganizationCBHFooter() {
  return (
    <div className="mt-6 flex justify-around rounded border p-4">
      <Link href="#" className={buttonVariants({ variant: 'outline' })}>
        OM
      </Link>
      <Link href="#" className={buttonVariants({ variant: 'outline' })}>
        OGC
      </Link>
      <Link href="#" className={buttonVariants({ variant: 'outline' })}>
        C
      </Link>
      <Link href="#" className={buttonVariants({ variant: 'outline' })}>
        FB
      </Link>
      <Link href="#" className={buttonVariants({ variant: 'outline' })}>
        S
      </Link>
    </div>
  )
}
