// app/admin-realty-8x2d9/blog-posts/page.tsx
// ============================================================
// BLOG CMS — Admin View
// Blog posts are managed via MDX files in content/blog/
// This page shows existing posts and guides how to add new ones
// ============================================================

import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { formatDate } from "@/lib/utils";
import { FileText, ExternalLink, Github, BookOpen } from "lucide-react";

export default function BlogPostsAdmin() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl shadow-sm border border-blue-100">
            <BookOpen size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-gray-900">Blog Posts</h1>
            <p className="font-body text-sm text-gray-500 mt-1">{posts.length} published posts</p>
          </div>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 font-body text-sm font-medium hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all shadow-sm bg-white"
        >
          <Github size={16} /> Open GitHub
        </a>
      </div>

      {/* How-to banner */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 mb-8 shadow-sm">
        <h3 className="font-body text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <FileText size={16} className="text-blue-600" /> How to publish a new blog post
        </h3>
        <ol className="font-body text-sm text-blue-900/70 space-y-2 list-decimal list-inside ml-1">
          <li>Create a new file: <code className="bg-blue-100/50 border border-blue-200 px-1.5 py-0.5 rounded text-blue-700 font-mono text-xs">content/blog/your-post-slug.mdx</code></li>
          <li>Add required frontmatter (see template below)</li>
          <li>Write your post in Markdown below the frontmatter</li>
          <li>Commit and push to GitHub — Vercel auto-builds within 60 seconds</li>
          <li>Post is live at <code className="bg-blue-100/50 border border-blue-200 px-1.5 py-0.5 rounded text-blue-700 font-mono text-xs">realtyconsultants.in/blog/your-post-slug</code></li>
        </ol>
      </div>

      {/* MDX template */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 font-mono text-xs text-gray-600 overflow-x-auto shadow-sm">
        <p className="text-gray-400 mb-3 font-body text-sm font-medium">{`# MDX Frontmatter Template — copy this to start a new post`}</p>
        <pre className="leading-relaxed whitespace-pre-wrap">{`---
title: "Your Post Title Here"
date: "${new Date().toISOString().split("T")[0]}"
excerpt: "One sentence summary shown in cards (max 160 chars)"
author: "Your Name"
category: "Market Insights"  # Options: Market Insights | Off Plan | Rentals | Investment | Lifestyle | News
coverImage: "/images/blog/your-image.jpg"
featured: false
tags: ["Dubai", "Investment", "2025"]
---

Your post content starts here. Write in standard Markdown.
`}</pre>
      </div>

      {/* Posts list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-body text-sm font-semibold text-gray-900 uppercase tracking-wider">Published Posts</h2>
        </div>
        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center font-body text-sm text-gray-500">
            No posts yet. Add an .mdx file to content/blog/ to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div key={post._id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-body text-sm font-medium text-gray-900 truncate">{post.title}</span>
                    {post.featured && (
                      <span className="font-body text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-body text-xs text-gray-500 font-medium">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">{post.category}</span>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readingTime}</span>
                    <code className="hidden sm:inline-block bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded text-gray-500">
                      content/blog/{post.slug}.mdx
                    </code>
                  </div>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center justify-center gap-2 font-body text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                >
                  View <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
