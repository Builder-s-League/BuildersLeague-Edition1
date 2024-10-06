import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link'

export default function Settings() {
  return (
    <div className="flex w-1/2 flex-col items-center border border-white mt-5">
      <div className="flex w-full flex-row mt-5">
        <div className="inline-flex w-9/12 gap-6">
          <Button variant="outline" className="w-24">
            E
          </Button>
          <Button variant="outline" className="w-24">
            UGC
          </Button>
          <Button variant="destructive" className="w-24">
            Settings
          </Button>
        </div>
        <div>
          <Button className="flex flex-col">
            <Link href="/login">Login/Out</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center w-80 items-center py-8">
        <h1 className='my-5'>Feedback</h1>
        <Textarea className='text-center w-1/2' placeholder='Text here...'></Textarea>
        <Button className="mt-7 flex w-32 flex-col w-1/2" variant="secondary">
          Upload Image
        </Button>
      </div>
      <div className='flex justify-around w-1/2 mb-5'>
        <Button className="flex w-20 flex-col" variant="secondary">
          Submit
        </Button>
        <Link href="./settings">
        <Button className="flex w-20 flex-col" variant="secondary">
          Go Back
        </Button>
        </Link>
      </div>
    </div>
  )
}
