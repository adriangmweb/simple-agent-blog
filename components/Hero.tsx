import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to
            <span className="text-primary-600 block">Modern Blog</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
            Discover insights, tutorials, and thoughts on modern web development. 
            Built with Next.js and Tailwind CSS for the best reading experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/preview"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Preview
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <Link
              href="#latest"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border border-gray-200 transition-colors"
            >
              Read Latest Posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}