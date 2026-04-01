import { allPosts } from "../../../.contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog | Market Insights",
  description: "Stay informed about Dubai's real estate market, investment tips, and community spotlights.",
};

export default function BlogPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="bg-white min-h-screen pt-[12vh]">
      <BlogClient posts={posts} />
    </main>
  );
}
