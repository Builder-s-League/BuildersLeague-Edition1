import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import { Heart, Eye, Edit2, X, Save, Trash2, Share2 } from 'lucide-react'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data: notes } = await supabase.from('notes').select()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Show...</h2>
        <div className="mb-4 flex flex-wrap gap-4">
          {['Public', 'Private Note', 'Articles'].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-6">
        {/* Standard Note */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="mb-2 text-lg font-semibold">I love it...</p>
          <p className="mb-4 text-sm text-gray-600">Topic 1, Item 2 ---</p>
          <div className="flex items-center justify-between">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
              <Edit2 className="mr-2 inline-block h-4 w-4" />
              Edit & Sharing
            </button>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Heart className="mr-1 h-5 w-5 text-red-500" /> 1
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-5 w-5 text-gray-500" /> 1
              </span>
            </div>
          </div>
        </div>

        {/* Editing Note */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="mb-2 text-lg font-semibold">I love it...</p>
          <textarea
            className="mb-4 w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
            rows={4}
            defaultValue='"Lorem ipsum, this is the quote efiwojfweoifjwe feiwojfwe"'
          ></textarea>
          <p className="mb-4 text-sm text-gray-600">Topic 1, Item 2 ---</p>
          <button className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600">
            <X className="mr-2 inline-block h-4 w-4" />
            Cancel Edit
          </button>
        </div>

        {/* Take Comments Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <textarea
            className="mb-4 w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
            rows={4}
            placeholder="Take Comments"
          ></textarea>
          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
              <Save className="mr-2 inline-block h-4 w-4" />
              Save
            </button>
            <button className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600">
              <Trash2 className="mr-2 inline-block h-4 w-4" />
              Delete Note
            </button>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                defaultChecked
              />
              <span>Hide my name</span>
            </label>
            <button className="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600">
              <Share2 className="mr-2 inline-block h-4 w-4" />
              Post to Public
            </button>
          </div>
        </div>

        {/* Article section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="mb-2 text-lg font-semibold">I love this article...</p>
          <a href="#" className="mb-4 block text-blue-500 hover:underline">
            Article link
          </a>
          <div className="flex items-center justify-between">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
              <Edit2 className="mr-2 inline-block h-4 w-4" />
              Edit & Sharing
            </button>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Heart className="mr-1 h-5 w-5 text-red-500" /> 1
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-5 w-5 text-gray-500" /> 1
              </span>
            </div>
          </div>
        </div>

        {/* Article under review */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="mb-2 text-lg font-semibold">I love this article...</p>
          <a href="#" className="mb-4 block text-blue-500 hover:underline">
            Article link
          </a>
          <div className="flex items-center justify-between">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
              <Edit2 className="mr-2 inline-block h-4 w-4" />
              Edit
            </button>
            <span className="font-semibold text-yellow-500">Under review</span>
          </div>
        </div>
      </div>
    </div>
  )
}
