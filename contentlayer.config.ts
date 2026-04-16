// contentlayer.config.ts
// ============================================================
// BLOG CMS CONFIGURATION
// ─────────────────────────────────────────────────────────────
// How it works:
//   1. Drop a .mdx file into content/blog/
//   2. Add required frontmatter (see fields below)
//   3. Push to GitHub → Vercel auto-builds → blog post is live
//
// Required frontmatter fields:
//   title, date, excerpt, author, category, coverImage
//
// Optional:
//   featured, tags, readingTime (auto-calculated)
// ============================================================

import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";

// ── Blog Post Schema ─────────────────────────────────────────
export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",

  fields: {
    // REQUIRED
    title: {
      type: "string",
      required: true,
      description: "Post title (shown in card and hero)",
    },
    date: {
      type: "date",
      required: true,
      description: "Publication date (YYYY-MM-DD)",
    },
    excerpt: {
      type: "string",
      required: true,
      description: "Short summary (shown in cards, max 160 chars)",
    },
    author: {
      type: "string",
      required: true,
      description: "Author name",
    },
    category: {
      type: "string",
      
      required: true,
    },

    slug: { type: "string" },
    keyword: { type: "string" },
    icp: { type: "string" },
    author_url: { type: "string" },
    schema: { type: "string" },


    coverImage: {
      type: "string",
      required: true,
      description: "Path to cover image (e.g. /images/blog/post-1.jpg)",
    },

    // OPTIONAL
    featured: {
      type: "boolean",
      default: false,
      description: "Pin to top of blog listing",
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Tags for filtering (e.g. [Dubai, Luxury, 2024])",
    },
  },

  // Computed fields (auto-generated, don't add to frontmatter)
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("blog/", ""),
    },
    url: {
      type: "string",
      resolve: (post) =>
        `/blog/${post._raw.flattenedPath.replace("blog/", "")}`,
    },
    readingTime: {
      type: "string",
      resolve: (post) => readingTime(post.body.raw).text,
    },
  },
}));

// ── Source Config ────────────────────────────────────────────
export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm as any],
    rehypePlugins: [rehypeSlug as any, rehypeHighlight as any],
  },
});
