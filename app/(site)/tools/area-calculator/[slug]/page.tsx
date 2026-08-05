// app/(site)/tools/area-calculator/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAreaPageContent, getAllAreaSlugs } from "@/content/area-calculator";
import { AreaCalculatorView } from "@/components/tools/area-calculator/AreaCalculatorView";

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllAreaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const content = getAreaPageContent(resolvedParams.slug);

  if (!content) {
    return {
      title: "Page Not Found",
    };
  }

  const canonicalUrl = `https://www.realtyconsultants.in/tools/area-calculator/${content.slug}`;

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: "Realty Holding & Management Consultants",
      title: content.title,
      description: content.metaDescription,
      url: canonicalUrl,
      images: [{ url: `${canonicalUrl}/opengraph-image` }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.metaDescription,
      images: [`${canonicalUrl}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default async function AreaCalculatorSlugPage({ params }: SlugPageProps) {
  const resolvedParams = await params;
  const content = getAreaPageContent(resolvedParams.slug);

  if (!content) {
    notFound();
  }

  return <AreaCalculatorView content={content} />;
}
