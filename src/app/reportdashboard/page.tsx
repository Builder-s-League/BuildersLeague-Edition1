import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/utils/supabase'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="bg-gray-800 text-white px-4 py-2 rounded">
          Go back
        </Link>
        <input
          type="text"
          placeholder="Search for content..."
          className="border border-gray-300 p-2 rounded w-1/3"
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2">Linked Content</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Report Content</th>
              <th className="px-4 py-2">Keep?</th>
            </tr>
          </thead>
          <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2 text-blue-600 cursor-pointer">
                </td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2 flex space-x-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">✔</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">✘</button>
                </td>
              </tr>
          </tbody>
        </table>

        <div className="flex justify-end p-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Export selected</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Delete selected</button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="px-2 py-1 border">1</button>
        <button className="px-2 py-1 border">2</button>
        <button className="px-2 py-1 border">3</button>
        {/* Add more pagination buttons as needed */}
      </div>

        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Linked Content</h3>
            <p>Lorem ipsum, this is the quote that was linked...</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>

        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Deny Report</h3>
            <p>Content: I am a bad note that might contain offensive content.</p>
            <textarea
              placeholder="Reason for denial/removal"
              className="w-full border border-gray-300 p-2 rounded mb-4"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Confirm Denial</button>
            </div>
          </div>
        </div>
      {searchParams?.message && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {searchParams.message}
        </div>
      )}
    </div>
  );
}