import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Hero from '@/components/Hero'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div>
      <Hero />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and thoughts on modern web development
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}