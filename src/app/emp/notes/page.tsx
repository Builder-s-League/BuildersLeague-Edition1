import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

export default async function NotesApp() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data: notes } = await supabase.from('notes').select()

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
            <div className="flex space-x-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  name="publicNote"
                />
                <span className="ml-2 text-gray-700">Public</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  name="privateNote"
                />
                <span className="ml-2 text-gray-700">Private</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  name="articles"
                />
                <span className="ml-2 text-gray-700">Articles</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-6">
            {/* Note */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-lg font-medium text-gray-800">
                I love it...
              </p>
              <div className="mb-4 text-sm text-gray-600">
                Topic 1, Item 2 ---
              </div>
              <div className="flex items-center justify-between">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Edit & Sharing
                </button>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="mr-1">1</span>
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">1</span>
                    <span role="img" aria-label="eye">
                      👁️
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Editing Note */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-lg font-medium text-gray-800">
                I love it...
              </p>
              <textarea
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                defaultValue='"Lorem ipsum, this is the quote efiwojfweoifjwe feiwojfwe"'
              ></textarea>
              <div className="mb-4 text-sm text-gray-600">
                Topic 1, Item 2 ---
              </div>
              <button className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Cancel Edit
              </button>
            </div>

            {/* Take Comments Section */}
            <div className="rounded-lg bg-gray-50 p-4">
              <textarea
                className="mb-4 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Take Comments"
              ></textarea>
              <div className="flex flex-wrap items-center gap-2">
                <button className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Save
                </button>
                <button className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Delete Note
                </button>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    defaultChecked
                  />
                  <span className="ml-2 text-gray-700">Hide my name</span>
                </label>
                <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Post to Public
                </button>
              </div>
            </div>

            {/* Article section */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-lg font-medium text-gray-800">
                I love this article...
              </p>
              <a href="#" className="mb-4 block text-blue-600 hover:underline">
                Article link
              </a>
              <div className="flex items-center justify-between">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Edit & Sharing
                </button>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <span className="mr-1">1</span>
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">1</span>
                    <span role="img" aria-label="eye">
                      👁️
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Article under review */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-2 text-lg font-medium text-gray-800">
                I love this article...
              </p>
              <a href="#" className="mb-4 block text-blue-600 hover:underline">
                Article link
              </a>
              <div className="flex items-center justify-between">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Edit
                </button>
                <span className="font-medium text-yellow-600">
                  Under review
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className="bg-gray-100 px-6 py-4">
          <div className="flex justify-between">
            <button className="h-12 w-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              F
            </button>
            <button className="h-12 w-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              C
            </button>
            <button className="h-12 w-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              N
            </button>
            <button className="h-12 w-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              P
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
