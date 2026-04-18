import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog | Market Insights | Amritpal Singh Advisory",
  description: "100 articles on Mohali real estate: sector intelligence, buyer protection, investment analysis, and legal rights. Written from 10+ years of first-hand market experience.",
};

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="bg-[#F9F9F9] min-h-screen pt-[12vh]">
      <BlogClient posts={posts} />
    </main>
  );
}
