import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const apiUrl = process.env.CMS_API_URL
  const endpoint = `/topics`
  const apiKey = process.env.CMS_API_KEY
  try {
    const response = await fetch(apiUrl + endpoint, {
      cache: 'no-cache',
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

    return new NextResponse(JSON.stringify(responseData), { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}
