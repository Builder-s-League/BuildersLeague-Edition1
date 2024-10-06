import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function Contact() {
  return (
    <div className="max-w mx-auto gap-1 rounded-lg p-6 shadow-md">
      <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Contact Us
      </h1>
      <p className="max-w-2xl text-lg font-light text-foreground">
        If you need assistance with renewing or canceling your subscription,
        we’re here to help! Please find our contact information below:
      </p>
      <div className="m-2 mx-auto mb-4 rounded-lg border border-gray-800 bg-background p-6  shadow-md">
        <div className="mb-4">
          <strong>Email:</strong>{' '}
          <span className="text-gray-100">support@example.com</span>
        </div>
        <div className="mb-4">
          <strong>Contact Number:</strong>{' '}
          <span className="text-gray-100">+1 (234) 567-890</span>
        </div>
      </div>
      <p className="mb-2 max-w-2xl text-lg font-light text-foreground">
        Our customer support team is available Monday to Friday, 9 AM to 5 PM
        (UTC). We aim to respond to all inquiries within 24 hours.
      </p>

      <Link href="/" className={buttonVariants({ variant: 'default' })}>
        Go Back
      </Link>
    </div>
  )
}
