'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, SortAsc, SortDesc, User, Tag, FileText } from 'lucide-react'
import { SearchResult, SearchOptions } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import SearchInput from '@/components/SearchInput'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    query: initialQuery,
    sortBy: 'relevance',
    sortOrder: 'desc'
  })
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Load categories and authors
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const response = await fetch('/api/search/filters')
        const data = await response.json()
        
        if (response.ok) {
          setCategories(data.categories)
          setAuthors(data.authors)
        } else {
          throw new Error(data.error || 'Failed to load filters')
        }
      } catch (error) {
        console.error('Error loading filter options:', error)
      }
    }
    loadFilterOptions()
  }, [])

  // Perform search
  const performSearch = useCallback(async (options: SearchOptions) => {
    if (!options.query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        q: options.query,
        sortBy: options.sortBy || 'relevance',
        sortOrder: options.sortOrder || 'desc'
      })
      
      if (options.category) {
        params.append('category', options.category)
      }
      
      if (options.author) {
        params.append('author', options.author)
      }
      
      const response = await fetch(`/api/search?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setResults(data.results)
      } else {
        throw new Error(data.error || 'Search failed')
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Search when options change
  useEffect(() => {
    performSearch(searchOptions)
  }, [searchOptions, performSearch])

  const handleSearchResults = (results: SearchResult[]) => {
    setResults(results)
  }

  const updateSearchOptions = (updates: Partial<SearchOptions>) => {
    setSearchOptions(prev => ({ ...prev, ...updates }))
  }

  const clearFilters = () => {
    setSearchOptions(prev => ({
      query: prev.query,
      sortBy: 'relevance',
      sortOrder: 'desc'
    }))
  }

  const getResultStats = () => {
    if (!searchOptions.query.trim()) return null
    
    const total = results.length
    const hasFilters = searchOptions.category || searchOptions.author
    
    return (
      <div className="text-neutral-600 mb-6">
        Found <span className="font-semibold text-neutral-900">{total}</span> result{total !== 1 ? 's' : ''} 
        {searchOptions.query && (
          <> for &ldquo;<span className="font-semibold text-neutral-900">{searchOptions.query}</span>&rdquo;</>
        )}
        {hasFilters && <span className="text-sm"> (filtered)</span>}
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            <span className="text-gradient">Search</span> Articles
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Discover content that matches your interests. Use the search below to find specific topics, authors, or categories.
          </p>
          
          <SearchInput 
            variant="page" 
            placeholder="Search for articles, topics, authors..." 
            onSearchResults={handleSearchResults}
          />
        </div>

        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                Filters
                {(searchOptions.category || searchOptions.author) && (
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                )}
              </button>

              {(searchOptions.category || searchOptions.author) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">Sort by:</span>
              <select
                value={searchOptions.sortBy}
                onChange={(e) => updateSearchOptions({ sortBy: e.target.value as 'relevance' | 'date' | 'title' })}
                className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
              
              <button
                onClick={() => updateSearchOptions({ 
                  sortOrder: searchOptions.sortOrder === 'asc' ? 'desc' : 'asc' 
                })}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                title={`Sort ${searchOptions.sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                {searchOptions.sortOrder === 'asc' ? (
                  <SortAsc className="w-4 h-4 text-neutral-600" />
                ) : (
                  <SortDesc className="w-4 h-4 text-neutral-600" />
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl p-6 mb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-3">
                    <Tag className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    value={searchOptions.category || ''}
                    onChange={(e) => updateSearchOptions({ 
                      category: e.target.value || undefined 
                    })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-3">
                    <User className="w-4 h-4" />
                    Author
                  </label>
                  <select
                    value={searchOptions.author || ''}
                    onChange={(e) => updateSearchOptions({ 
                      author: e.target.value || undefined 
                    })}
                    className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All authors</option>
                    {authors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          {getResultStats()}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-neutral-600">Searching...</p>
            </div>
          ) : searchOptions.query.trim() ? (
            results.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result, index) => (
                  <div 
                    key={result.post.slug} 
                    className="animate-slide-up"
                    style={{ '--stagger': index } as React.CSSProperties}
                  >
                    <div className="relative">
                      <BlogCard post={result.post} />
                      
                      {/* Match indicators */}
                      <div className="absolute top-4 right-4 flex flex-wrap gap-1">
                        {result.matchedFields.includes('title') && (
                          <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full" title="Found in title">
                            Title
                          </span>
                        )}
                        {result.matchedFields.includes('category') && (
                          <span className="bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded-full" title="Found in category">
                            Category
                          </span>
                        )}
                        {result.matchedFields.includes('content') && (
                          <span className="bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full" title="Found in content">
                            Content
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">No results found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search terms or removing some filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300"
                >
                  Clear filters
                </button>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">Start searching</h3>
              <p className="text-neutral-600">
                Enter a search term above to find relevant articles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-20">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}