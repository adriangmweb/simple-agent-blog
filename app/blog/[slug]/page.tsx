import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Modern Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <div className="flex items-center mr-6">
                <User className="w-4 h-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center mr-6">
                <Clock className="w-4 h-4 mr-2" />
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm">{post.readTime} min read</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </header>
          
          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </div>
    </div>
  )
}