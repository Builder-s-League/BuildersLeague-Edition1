import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing topic id' }, { status: 400 })
  }

  return NextResponse.json(
    { message: 'Topics fetched successfully' },
    { status: 200 },
  )
}
