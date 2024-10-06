import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing topic id' }, { status: 400 })
  }

  const apiUrl = process.env.CMS_API_URL
  const endpoint = `/topics/${id}?locale=undefined&draft=false&depth=4`
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  try {
    const response = await fetch(apiUrl + endpoint, {
      headers: {
        Authorization: `users API-Key 1644be42-c99b-477d-b721-51a748cd7891`,
      },
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    const data = await response.json()

    const responseData = {
      ...data,
      progress: 50,
    }

    console.log('responseData', responseData)

    return NextResponse.json(responseData)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
