import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function Settings() {
  return (
    <div className="mt-5 flex w-1/2 flex-col items-center border border-white">
      <div className="mt-5 flex w-full flex-row">
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
      <div className="flex w-80 flex-col items-center items-center py-8">
        <h1 className="my-5">Feedback</h1>
        <Textarea
          className="w-1/2 text-center"
          placeholder="Text here..."
        ></Textarea>
        <Button className="mt-7 flex w-1/2 w-32 flex-col" variant="secondary">
          Upload Image
        </Button>
      </div>
      <div className="mb-5 flex w-1/2 justify-around">
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
