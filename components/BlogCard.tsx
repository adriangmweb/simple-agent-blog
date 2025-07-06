import Link from 'next/link'
import { format } from 'date-fns'
import { Clock, ArrowRight, User } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: number
  category: string
}

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg card-shadow overflow-hidden group">
      <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-100 to-primary-200">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {post.title.charAt(0)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Read more
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}