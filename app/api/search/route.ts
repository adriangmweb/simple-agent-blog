import { NextRequest, NextResponse } from 'next/server'
import { searchPosts, SearchOptions } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || undefined
    const author = searchParams.get('author') || undefined
    const sortBy = (searchParams.get('sortBy') as 'relevance' | 'date' | 'title') || 'relevance'
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    
    if (!query.trim()) {
      return NextResponse.json({ results: [], total: 0 })
    }
    
    const searchOptions: SearchOptions = {
      query,
      category,
      author,
      sortBy,
      sortOrder
    }
    
    const results = await searchPosts(searchOptions)
    
    return NextResponse.json({
      results,
      total: results.length,
      query,
      category,
      author,
      sortBy,
      sortOrder
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    )
  }
}