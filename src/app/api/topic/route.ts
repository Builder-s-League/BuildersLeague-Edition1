import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing topic id' }, { status: 400 })
  }

  const apiUrl = process.env.CMS_API_URL
  // http://localhost:3000/api/topics/67bb767e6b63e67ae807f34c?locale=undefined&draft=false&depth=1

  const endpoint = `/topics/${id}?locale=undefined&draft=false&depth=1`
  const apiKey = process.env.CMS_API_KEY

  try {
    const response = await fetch(apiUrl + endpoint, {
      headers: {
        Authorization: `users API-Key ${apiKey}`,
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

    return NextResponse.json(responseData)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
