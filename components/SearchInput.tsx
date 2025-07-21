'use client'
import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SearchResult } from '@/lib/posts'
import Link from 'next/link'

interface SearchInputProps {
  variant?: 'header' | 'page'
  placeholder?: string
  onSearchResults?: (results: SearchResult[]) => void
}

export default function SearchInput({ 
  variant = 'header', 
  placeholder = 'Search articles...',
  onSearchResults 
}: SearchInputProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchDelay = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true)
        try {
          const params = new URLSearchParams({
            q: query,
            sortBy: 'relevance'
          })
          
          const response = await fetch(`/api/search?${params}`)
          const data = await response.json()
          
          if (response.ok) {
            setResults(data.results.slice(0, 5)) // Limit to 5 results for dropdown
            setShowResults(true)
            onSearchResults?.(data.results)
          } else {
            throw new Error(data.error || 'Search failed')
          }
        } catch (error) {
          console.error('Search error:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
        setShowResults(false)
        onSearchResults?.([])
      }
    }, 300)

    return () => clearTimeout(searchDelay)
  }, [query, onSearchResults])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowResults(false)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
    onSearchResults?.([])
  }

  const inputClasses = variant === 'header' 
    ? "w-full px-4 py-2 pl-10 pr-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-neutral-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
    : "w-full px-6 py-4 pl-14 pr-12 bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 shadow-lg"

  const containerClasses = variant === 'header'
    ? "relative w-64"
    : "relative w-full max-w-2xl mx-auto"

  return (
    <div ref={searchRef} className={containerClasses}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          variant === 'header' ? 'w-4 h-4' : 'w-5 h-5'
        } text-neutral-500`} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
        
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              variant === 'header' ? 'w-4 h-4' : 'w-5 h-5'
            } text-neutral-500 hover:text-neutral-700 transition-colors`}
          >
            <X />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-neutral-500">
              <div className="animate-spin w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : (
            <>
              {results.map((result) => (
                <Link
                  key={result.post.slug}
                  href={`/blog/${result.post.slug}`}
                  className="block p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-b-0"
                  onClick={() => setShowResults(false)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 mb-1 line-clamp-1">
                        {result.post.title}
                      </h4>
                      <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
                        {result.post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          {result.post.category}
                        </span>
                        <span>by {result.post.author}</span>
                        <span>•</span>
                        <span>{result.post.readTime} min read</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 ml-2 flex-shrink-0" />
                  </div>
                </Link>
              ))}
              
              {query && (
                <div className="p-3 border-t border-neutral-200">
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    View all results for &ldquo;{query}&rdquo;
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}