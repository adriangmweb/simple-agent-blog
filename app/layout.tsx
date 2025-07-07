import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog',
  description: 'A modern, stylish blog built with Next.js and Tailwind CSS',
  keywords: ['blog', 'modern', 'next.js', 'tailwind', 'typescript'],
  authors: [{ name: 'Modern Blog' }],
  creator: 'Modern Blog',
  publisher: 'Modern Blog',
  openGraph: {
    title: 'Modern Blog',
    description: 'A modern, stylish blog built with Next.js and Tailwind CSS',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog',
    description: 'A modern, stylish blog built with Next.js and Tailwind CSS',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col gradient-bg-animated">
          {/* Floating background shapes */}
          <div className="floating-shapes">
            <div className="floating-shape floating-shape-1"></div>
            <div className="floating-shape floating-shape-2"></div>
            <div className="floating-shape floating-shape-3"></div>
          </div>
          
          <Header />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}