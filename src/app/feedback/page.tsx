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
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-black p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Feedback</h1>
        <button className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700">
          Provide Text Feedback
        </button>
        <button className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white transition duration-200 hover:bg-green-700">
          Upload Image
        </button>
        <button className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition duration-200 hover:bg-indigo-700">
          Submit Feedback
        </button>
        <button
          onClick={() => {
            router.back()
          }}
          className="w-full rounded-lg bg-gray-600 py-2 font-semibold text-white transition duration-200 hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}
