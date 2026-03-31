// app/admin/blog-posts/page.tsx
// ============================================================
// BLOG CMS — Admin View
// Blog posts are managed via MDX files in content/blog/
// This page shows existing posts and guides how to add new ones
// ============================================================

import { allPosts } from "../../../.contentlayer/generated";
import { compareDesc } from "date-fns";
import { formatDate } from "@/lib/utils";
import { FileText, ExternalLink, Github } from "lucide-react";

export default function BlogPostsAdmin() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-white font-light">Blog Posts</h1>
          <p className="font-body text-xs text-white/40 mt-1">{posts.length} published posts</p>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 border border-white/15 text-white/60 font-body text-sm hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all"
        >
          <Github size={14} /> Open GitHub
        </a>
      </div>

      {/* How-to banner */}
      <div className="bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.15)] p-5 mb-6">
        <h3 className="font-body text-sm font-medium text-[var(--gold)] mb-2 flex items-center gap-2">
          <FileText size={14} /> How to publish a new blog post
        </h3>
        <ol className="font-body text-xs text-white/55 space-y-1 list-decimal list-inside">
          <li>Create a new file: <code className="bg-white/5 px-1.5 py-0.5 rounded text-[var(--gold-light)]">content/blog/your-post-slug.mdx</code></li>
          <li>Add required frontmatter (see template below)</li>
          <li>Write your post in Markdown below the frontmatter</li>
          <li>Commit and push to GitHub — Vercel auto-builds within 60 seconds</li>
          <li>Post is live at <code className="bg-white/5 px-1.5 py-0.5 rounded text-[var(--gold-light)]">monterealestate.ae/blog/your-post-slug</code></li>
        </ol>
      </div>

      {/* MDX template */}
      <div className="bg-[#141414] border border-white/5 p-5 mb-6 font-mono text-xs text-white/50 overflow-x-auto">
        <p className="text-white/25 mb-2">{`# MDX Frontmatter Template — copy this to start a new post`}</p>
        <pre className="leading-relaxed">{`---
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
      <div className="bg-[#141414] border border-white/5">
        <div className="px-5 py-3 border-b border-white/5">
          <h2 className="font-body text-sm font-medium text-white">Published Posts</h2>
        </div>
        {posts.length === 0 ? (
          <div className="px-5 py-12 text-center font-body text-sm text-white/30">
            No posts yet. Add an .mdx file to content/blog/ to get started.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {posts.map((post) => (
              <div key={post._id} className="px-5 py-4 flex items-center gap-4 hover:bg-white/[0.02]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-body text-sm text-white truncate">{post.title}</span>
                    {post.featured && (
                      <span className="font-body text-xs px-2 py-0.5 bg-[rgba(201,168,76,0.15)] text-[var(--gold)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 font-body text-xs text-white/35">
                    <span>{post.category}</span>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readingTime}</span>
                    <code className="bg-white/5 px-1.5 py-0.5 rounded text-white/40">
                      content/blog/{post.slug}.mdx
                    </code>
                  </div>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-[var(--gold)] transition-colors"
                >
                  View <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
