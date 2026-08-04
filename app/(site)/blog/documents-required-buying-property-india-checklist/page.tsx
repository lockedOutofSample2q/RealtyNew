import PostPage, { generateMetadata as generatePostMetadata } from "../[slug]/page";

const SLUG = "documents-required-buying-property-india-checklist";

export async function generateMetadata() {
  return generatePostMetadata({ params: Promise.resolve({ slug: SLUG }) });
}

export default async function Page() {
  return PostPage({ params: Promise.resolve({ slug: SLUG }) });
}
