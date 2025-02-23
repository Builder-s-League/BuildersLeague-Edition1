import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://website-742c531.payloadcms.app/api/pages',
    )
    if (!response.ok) {
      throw new Error('Failed to fetch content')
    }
    const data = await response.json()
    return NextResponse.json(data.docs)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json([])
  }
}
