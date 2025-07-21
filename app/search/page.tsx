'use client'
import { useState, useEffect, Suspense } from 'react'
import { Search, Grid, List, Calendar, User, Clock, Tag } from 'lucide-react'
import { BlogPost } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import { useSearchParams } from 'next/navigation'

function SearchContent() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get initial query from URL params if available
    const initialQuery = searchParams.get('q')
    if (initialQuery) {
      setQuery(initialQuery)
    }
  }, [searchParams])

  useEffect(() => {
    // Load categories
    const loadCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data.categories || [])
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    const performSearch = async () => {
      if (query.trim().length < 2 && !selectedCategory) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.append('q', query)
        if (selectedCategory) params.append('category', selectedCategory)
        
        const response = await fetch(`/api/search?${params}`)
        const data = await response.json()
        
        const sortedResults = data.posts || []
        
        // Sort results
        sortedResults.sort((a: BlogPost, b: BlogPost) => {
          let aValue: string | number, bValue: string | number
          
          switch (sortBy) {
            case 'title':
              aValue = a.title.toLowerCase()
              bValue = b.title.toLowerCase()
              break
            case 'readTime':
              aValue = a.readTime
              bValue = b.readTime
              break
            case 'date':
            default:
              aValue = new Date(a.date).getTime()
              bValue = new Date(b.date).getTime()
              break
          }
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1
          } else {
            return aValue < bValue ? 1 : -1
          }
        })
        
        setResults(sortedResults)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(performSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, selectedCategory, sortBy, sortOrder])

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory('')
    setSortBy('date')
    setSortOrder('desc')
  }

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200/50 rounded-full px-4 py-2 mb-6 shadow-lg shadow-primary-100/30">
            <Search className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Discover Content</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            <span className="text-gradient">Search</span> Articles
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Find exactly what you&apos;re looking for across our entire content library.
          </p>
        </div>

        {/* Search Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-neutral-200/20 border border-white/20 mb-8">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, topics, authors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-neutral-900 placeholder-neutral-500 text-lg"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-neutral-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/90 border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('-')
                  setSortBy(sort as 'date' | 'title' | 'readTime')
                  setSortOrder(order as 'asc' | 'desc')
                }}
                className="bg-white/90 border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="readTime-asc">Shortest Read</option>
                <option value="readTime-desc">Longest Read</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Filters */}
            {(query || selectedCategory || sortBy !== 'date' || sortOrder !== 'desc') && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-neutral-600">
            {isLoading ? (
              'Searching...'
            ) : (
              `${results.length} article${results.length !== 1 ? 's' : ''} found`
            )}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-neutral-600">Searching...</span>
          </div>
        ) : results.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {results.map((post, index) => (
              <div 
                key={post.slug}
                className="animate-slide-up stagger-animation"
                style={{ '--stagger': index } as React.CSSProperties}
              >
                {viewMode === 'grid' ? (
                  <BlogCard post={post} />
                ) : (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-neutral-200/20 border border-white/20 hover:shadow-2xl hover:shadow-primary-300/30 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-700 font-bold text-2xl">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-lg text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="text-neutral-500 text-sm">•</span>
                          <span className="text-neutral-500 text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 hover:text-primary-700 transition-colors">
                          <a href={`/blog/${post.slug}`}>{post.title}</a>
                        </h3>
                        <p className="text-neutral-600 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              {query || selectedCategory ? 'No Results Found' : 'Start Searching'}
            </h3>
            <p className="text-neutral-600 max-w-md mx-auto">
              {query || selectedCategory 
                ? 'Try adjusting your search terms or filters to find what you&apos;re looking for.'
                : 'Enter a search term above to find articles, topics, and more.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-8 pb-20">
        <div className="container-custom">
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mx-auto"></div>
            <span className="mt-3 text-neutral-600 block">Loading search...</span>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}