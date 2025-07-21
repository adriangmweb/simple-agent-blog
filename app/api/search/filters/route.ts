import { NextResponse } from 'next/server'
import { getCategories, getAuthors } from '@/lib/posts'

export async function GET() {
  try {
    const [categories, authors] = await Promise.all([
      getCategories(),
      getAuthors()
    ])
    
    return NextResponse.json({
      categories,
      authors
    })
  } catch (error) {
    console.error('Filters API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    )
  }
}