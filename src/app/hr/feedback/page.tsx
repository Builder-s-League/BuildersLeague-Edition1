import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import Link from 'next/link'
import { Upload } from 'lucide-react'

export default function Settings() {
  return (
    <div className="container mx-auto mt-8 px-4">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-wrap gap-4">
            <Button variant="outline">E</Button>
            <Button variant="outline">UGC</Button>
            <Button variant="destructive">Settings</Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Feedback</h2>
            <Textarea
              className="min-h-[100px]"
              placeholder="Enter your feedback here..."
            />
            <Button className="w-full" variant="secondary">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="secondary">Submit</Button>
          <Link href="./settings">
            <Button variant="outline">Go Back</Button>
          </Link>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center">
        <Link href="/login">
          <Button variant="link">Login/Out</Button>
        </Link>
      </div>
    </div>
  )
}
