'use client'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="glass-effect border-b border-white/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary-500/30 group-hover:shadow-primary-600/40 transition-all duration-300 transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">Modern Blog</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="relative px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/preview" 
              className="relative px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 group"
            >
              Preview
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="relative px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* CTA Button */}
            <Link 
              href="/preview" 
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-600/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </nav>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-neutral-700" /> : <Menu className="w-6 h-6 text-neutral-700" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect border-t border-white/20 backdrop-blur-xl animate-slide-down">
            <div className="container-custom py-6">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="px-4 py-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-xl hover:bg-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/preview" 
                  className="px-4 py-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-xl hover:bg-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Preview
                </Link>
                <Link 
                  href="/about" 
                  className="px-4 py-3 text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 rounded-xl hover:bg-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/preview" 
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 text-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}