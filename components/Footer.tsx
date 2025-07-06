import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(20,184,166,0.3),transparent_50%)]"></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-primary-600/10 to-primary-800/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br from-secondary-600/10 to-secondary-800/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mr-4 shadow-2xl shadow-primary-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Modern Blog</span>
            </div>
            
            <p className="text-neutral-300 mb-6 max-w-md leading-relaxed">
              Crafting the future of web development through innovative tutorials, insights, and cutting-edge techniques. 
              <span className="text-gradient-accent font-medium"> Built for creators, by creators.</span>
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="group w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="#" 
                className="group w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gradient">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/preview" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Preview
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gradient">Categories</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Web Development
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  JavaScript
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  React & Next.js
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Design Systems
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0 flex items-center">
              <span>&copy; 2024 Modern Blog. Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>and cutting-edge technology.</span>
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-neutral-400 hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}