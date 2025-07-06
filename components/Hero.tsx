import { ArrowRight, Sparkles, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.1),transparent_70%)]"></div>
      </div>
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-secondary-400/20 to-secondary-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent-400/10 to-accent-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200/50 rounded-full px-4 py-2 mb-8 shadow-lg shadow-primary-100/30 animate-slide-down">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Welcome to the future of blogging
            </span>
            <TrendingUp className="w-4 h-4 text-primary-600" />
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight animate-slide-up">
            <span className="block text-neutral-900 mb-2">
              Where Ideas
            </span>
            <span className="block text-gradient font-black">
              Come Alive
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-600 mb-8 leading-relaxed max-w-4xl mx-auto font-light animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover cutting-edge insights, tutorials, and perspectives on modern web development. 
            <span className="text-gradient-accent font-medium"> Built for creators, by creators.</span>
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-effect rounded-full px-4 py-2 text-sm font-medium text-neutral-700">
              <Star className="w-4 h-4 inline mr-1 text-accent-500" />
              Next.js 14
            </div>
            <div className="glass-effect rounded-full px-4 py-2 text-sm font-medium text-neutral-700">
              <Star className="w-4 h-4 inline mr-1 text-accent-500" />
              TypeScript
            </div>
            <div className="glass-effect rounded-full px-4 py-2 text-sm font-medium text-neutral-700">
              <Star className="w-4 h-4 inline mr-1 text-accent-500" />
              Tailwind CSS
            </div>
            <div className="glass-effect rounded-full px-4 py-2 text-sm font-medium text-neutral-700">
              <Star className="w-4 h-4 inline mr-1 text-accent-500" />
              Modern Design
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/preview"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white font-semibold rounded-2xl shadow-2xl shadow-primary-500/40 hover:shadow-primary-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Explore Preview
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="#latest"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 text-neutral-900 font-semibold rounded-2xl border-2 border-neutral-200/50 hover:border-primary-300/50 shadow-xl shadow-neutral-200/30 hover:shadow-primary-200/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center">
                Read Latest Posts
                <div className="ml-2 w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </span>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-neutral-200/50 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">50+</div>
              <div className="text-sm text-neutral-600">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">10K+</div>
              <div className="text-sm text-neutral-600">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">5★</div>
              <div className="text-sm text-neutral-600">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}