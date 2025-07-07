import Link from 'next/link'
import { format } from 'date-fns'
import { Clock, ArrowRight, User, Calendar, Tag } from 'lucide-react'

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
    <article className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-neutral-200/20 hover:shadow-2xl hover:shadow-primary-300/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white/50 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header Image Area */}
      <div className="relative aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-100 via-primary-200 to-secondary-200 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)] opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.1),transparent_70%)] opacity-50"></div>
        
        {/* Icon */}
        <div className="flex items-center justify-center h-full">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/40 group-hover:shadow-primary-600/50 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
            <span className="text-white font-bold text-3xl">
              {post.title.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-primary-100/50">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        </div>
        
        {/* Read time badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-neutral-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg shadow-neutral-100/50">
            <Clock className="w-3 h-3" />
            {post.readTime} min
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-8">
        {/* Title */}
        <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <Link 
          href={`/blog/${post.slug}`}
          className="group/cta inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-all duration-300"
        >
          <span>Read Article</span>
          <div className="w-6 h-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center group-hover/cta:shadow-lg group-hover/cta:shadow-primary-500/30 transition-all duration-300 transform group-hover/cta:scale-110">
            <ArrowRight className="w-3 h-3 text-white group-hover/cta:translate-x-0.5 transition-transform" />
          </div>
        </Link>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </article>
  )
}