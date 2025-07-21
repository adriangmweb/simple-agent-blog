import { NextRequest, NextResponse } from 'next/server'
import { searchPosts, getPostsByCategory, getAllPosts } from '@/lib/posts'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const category = searchParams.get('category')

    let posts

    if (query && category) {
      // Search within a specific category
      const categoryPosts = await getPostsByCategory(category)
      const searchQuery = query.toLowerCase()
      posts = categoryPosts.filter(post => {
        const searchableContent = [
          post.title,
          post.excerpt,
          post.content.replace(/<[^>]*>/g, ''), // Strip HTML tags
          post.author
        ].join(' ').toLowerCase()
        return searchableContent.includes(searchQuery)
      })
    } else if (query) {
      // Search all posts
      posts = await searchPosts(query)
    } else if (category) {
      // Get posts by category only
      posts = await getPostsByCategory(category)
    } else {
      // No filters, return all posts
      posts = await getAllPosts()
    }
    
    return NextResponse.json({ 
      posts,
      total: posts.length 
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}