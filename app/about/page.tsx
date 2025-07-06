import { User, Code, Coffee, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Modern Blog</h1>
            <p className="text-xl text-gray-600">
              A modern, stylish blog built with cutting-edge web technologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div className="bg-white rounded-lg p-6 card-shadow">
              <div className="flex items-center mb-4">
                <Code className="w-8 h-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Built with Modern Tech</h2>
              </div>
              <p className="text-gray-600 mb-4">
                This blog is built using the latest web technologies including Next.js 14, 
                TypeScript, and Tailwind CSS for the best developer and user experience.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js 14 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for modern styling</li>
                <li>• Lucide React for icons</li>
                <li>• Markdown support for posts</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 card-shadow">
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Purpose</h2>
              </div>
              <p className="text-gray-600 mb-4">
                This blog serves as a showcase for modern web development practices 
                and a platform for sharing knowledge about cutting-edge technologies.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Share web development insights</li>
                <li>• Demonstrate modern design patterns</li>
                <li>• Provide practical tutorials</li>
                <li>• Showcase best practices</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 card-shadow">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-red-500 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">Made with Love</h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                This blog is a labor of love, created to provide an excellent reading experience 
                while showcasing modern web development capabilities.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Developer Experience</h3>
                <p className="text-gray-600">
                  Built with developer productivity and maintainability in mind
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Experience</h3>
                <p className="text-gray-600">
                  Designed for optimal reading experience across all devices
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Standards</h3>
                <p className="text-gray-600">
                  Follows the latest web standards and best practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}