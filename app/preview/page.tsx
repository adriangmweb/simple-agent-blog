import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import { Eye, Code, Palette } from 'lucide-react'

export default async function Preview() {
  const posts = await getAllPosts()

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Eye className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Blog Preview</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Preview your blog posts and design components in this dedicated space
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="bg-white rounded-lg p-6 card-shadow">
            <div className="flex items-center mb-4">
              <Code className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Components</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Test and preview individual components here
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Blog Card Component</h3>
                <p className="text-sm text-gray-600">Preview how blog cards appear in different layouts</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Typography</h3>
                <p className="text-sm text-gray-600">Test different text styles and hierarchies</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 card-shadow">
            <div className="flex items-center mb-4">
              <Palette className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Design System</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Color palette and design tokens
            </p>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div className={`w-full h-12 rounded-lg bg-primary-${shade} mb-1`}></div>
                  <span className="text-xs text-gray-600">{shade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Blog Posts Preview
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}