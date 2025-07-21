'use client'
import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/lib/posts'

interface SearchBoxProps {
  onClose?: () => void
  isOpen?: boolean
  className?: string
}

export default function SearchBox({ onClose, isOpen, className }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const searchPosts = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.posts || [])
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchPosts, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleResultClick = (slug: string) => {
    router.push(`/blog/${slug}`)
    setQuery('')
    setShowResults(false)
    onClose?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  }

  return (
    <div className={`relative ${className || ''}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-12 py-3 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-neutral-900 placeholder-neutral-500"
        />
        {isLoading && (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5 animate-spin" />
        )}
        {!isLoading && query && (
          <button
            onClick={() => {
              setQuery('')
              setShowResults(false)
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-2xl shadow-2xl shadow-neutral-900/10 max-h-96 overflow-y-auto z-50">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => handleResultClick(post.slug)}
                  className="w-full text-left p-4 hover:bg-neutral-50 rounded-xl transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-700 font-bold text-lg">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-lg">
                          {post.category}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-neutral-400" />
              </div>
              <p className="text-neutral-600 font-medium">No articles found</p>
              <p className="text-sm text-neutral-500 mt-1">
                Try searching for different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}