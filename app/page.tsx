import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Hero from '@/components/Hero'
import SearchBox from '@/components/SearchBox'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="relative">
      <Hero />
      
      {/* Search Section */}
      <section className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/80 backdrop-blur-sm"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Find What You&apos;re <span className="text-gradient">Looking For</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              Search through our entire content library to discover articles, tutorials, and insights tailored to your interests.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SearchBox className="mb-6" />
            <div className="text-center">
              <a 
                href="/search" 
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Advanced Search Options →
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Articles Section */}
      <section id="latest" className="py-20 lg:py-32 relative">
        {/* Section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white/90 backdrop-blur-sm"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200/50 rounded-full px-4 py-2 mb-6 shadow-lg shadow-primary-100/30">
              <span className="w-2 h-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"></span>
              <span className="text-sm font-medium text-primary-700">Latest Content</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              <span className="text-gradient">Featured</span> Articles
            </h2>
            
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge insights and tutorials crafted for modern developers. 
              <span className="text-gradient-accent font-medium"> Stay ahead of the curve.</span>
            </p>
          </div>
          
          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <div 
                key={post.slug} 
                className="animate-slide-up stagger-animation"
                style={{ '--stagger': index } as React.CSSProperties}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          
          {/* Show more button */}
          <div className="text-center mt-16">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-semibold rounded-2xl shadow-2xl shadow-secondary-500/40 hover:shadow-secondary-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden">
              <span className="relative z-10">
                Load More Articles
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 to-secondary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Stay in the <span className="text-gradient-accent">Loop</span>
            </h2>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Get the latest articles, tutorials, and insights delivered straight to your inbox. 
              Join our community of modern developers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white font-semibold rounded-2xl shadow-2xl shadow-accent-500/40 hover:shadow-accent-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}