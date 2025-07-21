import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  readTime: number
  category: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }

  let fileNames: string[] = []
  
  try {
    fileNames = fs.readdirSync(postsDirectory)
  } catch {
    // If directory doesn't exist or is empty, return sample posts
    return getSamplePosts()
  }

  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content)
        
        const contentHtml = processedContent.toString()

        return {
          slug,
          title: matterResult.data.title || 'Untitled',
          date: matterResult.data.date || new Date().toISOString(),
          excerpt: matterResult.data.excerpt || '',
          content: contentHtml,
          author: matterResult.data.author || 'Anonymous',
          readTime: matterResult.data.readTime || 5,
          category: matterResult.data.category || 'General',
        }
      })
  )

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  if (!query.trim()) {
    return []
  }

  const allPosts = await getAllPosts()
  const searchQuery = query.toLowerCase()

  return allPosts.filter(post => {
    // Search in title, excerpt, content (stripped of HTML), author, and category
    const searchableContent = [
      post.title,
      post.excerpt,
      post.content.replace(/<[^>]*>/g, ''), // Strip HTML tags
      post.author,
      post.category
    ].join(' ').toLowerCase()

    return searchableContent.includes(searchQuery)
  })
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const categories = [...new Set(allPosts.map(post => post.category))]
  return categories.sort()
}

function getSamplePosts(): BlogPost[] {
  return [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Getting Started with Next.js: A Modern React Framework',
      date: '2024-01-15',
      excerpt: 'Learn how to build modern web applications with Next.js, the popular React framework that makes it easy to create full-stack web applications.',
      content: `
        <h2>Introduction to Next.js</h2>
        <p>Next.js is a powerful React framework that enables you to build full-stack web applications. It provides many features out of the box, including server-side rendering, static site generation, and API routes.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li>Server-side rendering (SSR)</li>
          <li>Static site generation (SSG)</li>
          <li>API routes</li>
          <li>Built-in CSS support</li>
          <li>Image optimization</li>
          <li>TypeScript support</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>To get started with Next.js, you can create a new project using the create-next-app command:</p>
        <pre><code>npx create-next-app@latest my-app</code></pre>
        
        <p>This will create a new Next.js application with all the necessary files and dependencies.</p>
      `,
      author: 'John Doe',
      readTime: 8,
      category: 'Next.js',
    },
    {
      slug: 'tailwind-css-best-practices',
      title: 'Tailwind CSS Best Practices for Modern Web Development',
      date: '2024-01-10',
      excerpt: 'Discover the best practices for using Tailwind CSS in your projects, including utility-first design principles and responsive design patterns.',
      content: `
        <h2>Why Tailwind CSS?</h2>
        <p>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS.</p>
        
        <h2>Best Practices</h2>
        <ol>
          <li><strong>Use utility classes</strong> - Build designs using utility classes instead of custom CSS</li>
          <li><strong>Leverage responsive design</strong> - Use responsive prefixes like sm:, md:, lg:</li>
          <li><strong>Create component classes</strong> - Extract repetitive patterns into component classes</li>
          <li><strong>Use the @apply directive</strong> - Apply utility classes in CSS files when needed</li>
        </ol>
        
        <h2>Example</h2>
        <pre><code>
&lt;div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"&gt;
  &lt;h2 class="text-2xl font-bold text-gray-900 mb-4"&gt;Card Title&lt;/h2&gt;
  &lt;p class="text-gray-600"&gt;Card content goes here&lt;/p&gt;
&lt;/div&gt;
        </code></pre>
      `,
      author: 'Jane Smith',
      readTime: 6,
      category: 'CSS',
    },
    {
      slug: 'modern-javascript-features',
      title: 'Modern JavaScript Features You Should Know in 2024',
      date: '2024-01-05',
      excerpt: 'Explore the latest JavaScript features that will make your code more efficient and readable, including optional chaining, nullish coalescing, and more.',
      content: `
        <h2>ES2024 Features</h2>
        <p>JavaScript continues to evolve with new features that make development more efficient and enjoyable.</p>
        
        <h2>Optional Chaining</h2>
        <p>Optional chaining allows you to safely access nested object properties:</p>
        <pre><code>const user = { profile: { name: 'John' } };
console.log(user?.profile?.name); // 'John'
console.log(user?.profile?.age); // undefined</code></pre>
        
        <h2>Nullish Coalescing</h2>
        <p>The nullish coalescing operator (??) provides a better way to handle default values:</p>
        <pre><code>const username = user.name ?? 'Anonymous';
const count = user.count ?? 0;</code></pre>
        
        <h2>Array Methods</h2>
        <p>New array methods like findLast() and findLastIndex() make array manipulation easier:</p>
        <pre><code>const numbers = [1, 2, 3, 4, 5];
const lastEven = numbers.findLast(n => n % 2 === 0); // 4</code></pre>
      `,
      author: 'Mike Johnson',
      readTime: 7,
      category: 'JavaScript',
    },
  ]
}