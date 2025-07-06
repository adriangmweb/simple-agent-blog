# Modern Blog

A modern, stylish blog built with Next.js 14, TypeScript, and Tailwind CSS, featuring a beautiful design and preview functionality.

## ✨ Features

- **Modern Design**: Clean, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Next.js 14**: Latest Next.js with App Router
- **Markdown Support**: Write blog posts in Markdown
- **Preview Mode**: Dedicated preview page for testing designs
- **Responsive**: Mobile-first responsive design
- **Performance**: Optimized for speed and SEO
- **Dark Mode Ready**: Easy to implement dark mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modern-blog
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
modern-blog/
├── app/                    # Next.js 14 App Router
│   ├── blog/
│   │   └── [slug]/
│   │       └── page.tsx   # Individual blog post pages
│   ├── preview/
│   │   └── page.tsx       # Preview page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable React components
│   ├── BlogCard.tsx       # Blog post card component
│   ├── Footer.tsx         # Footer component
│   ├── Header.tsx         # Header with navigation
│   └── Hero.tsx           # Hero section component
├── lib/                   # Utility functions
│   └── posts.ts           # Blog post management
├── posts/                 # Markdown blog posts (optional)
├── public/                # Static assets
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 📝 Writing Blog Posts

### Method 1: Markdown Files (Recommended)

1. Create a `.md` file in the `posts/` directory
2. Add frontmatter at the top:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
author: "Your Name"
readTime: 5
category: "Web Development"
---

# Your Blog Post Content

Write your blog post content here using Markdown syntax.
```

### Method 2: Sample Posts

If no markdown files are found, the blog will display sample posts defined in `lib/posts.ts`. You can edit these directly in the code.

## 🎨 Customization

### Colors

The blog uses a custom color palette defined in `tailwind.config.js`. The primary color is a blue theme that you can customize:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... other shades
    900: '#0c4a6e',
  },
}
```

### Typography

The blog uses Inter font by default. You can change this in `app/layout.tsx`:

```typescript
const inter = Inter({ subsets: ['latin'] })
```

### Components

All components are located in the `components/` directory and are fully customizable:

- `Header.tsx`: Navigation and branding
- `Footer.tsx`: Footer with links and social media
- `Hero.tsx`: Landing page hero section
- `BlogCard.tsx`: Blog post preview cards

## 🔧 Preview Mode

The blog includes a dedicated preview page (`/preview`) where you can:

- Test component designs
- Preview the color palette
- See how blog posts look in different layouts
- Test responsive design

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The blog is a standard Next.js application and can be deployed to any platform that supports Node.js:

- Netlify
- AWS Amplify
- Railway
- Render

Build the application:
```bash
npm run build
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure

The project follows Next.js 14 conventions:
- `app/` directory for App Router
- Server Components by default
- Client Components marked with `'use client'`
- TypeScript for type safety

### Adding New Features

1. **New Pages**: Add to `app/` directory
2. **New Components**: Add to `components/` directory
3. **Utilities**: Add to `lib/` directory
4. **Styling**: Use Tailwind classes or extend in `globals.css`

## 📚 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Markdown**: gray-matter + remark
- **Date Handling**: date-fns

## 🎯 Performance

The blog is optimized for performance:
- Server-side rendering
- Static generation where possible
- Optimized images
- Minimal JavaScript bundle
- Efficient CSS with Tailwind

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/your-username/modern-blog/issues)
2. Review the documentation
3. Ask questions in the discussions section

---

Built with ❤️ using Next.js and Tailwind CSS
