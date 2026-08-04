import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

interface MdxContentProps {
  source: string;
}

const slugify = (text: any): string => {
  if (!text) return "";
  if (typeof text === "string") {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }
  if (Array.isArray(text)) {
    return text.map(slugify).join("-");
  }
  if (typeof text === "object" && text.props && text.props.children) {
    return slugify(text.props.children);
  }
  return "";
};

const components = {
  h2: (props: any) => {
    const id = props.id || slugify(props.children);
    return <h2 id={id} className="scroll-mt-32 font-serif text-2xl sm:text-3xl font-semibold text-charcoal mt-10 mb-4" {...props} />;
  },
  h3: (props: any) => {
    const id = props.id || slugify(props.children);
    return <h3 id={id} className="scroll-mt-32 font-serif text-xl sm:text-2xl font-semibold text-charcoal mt-8 mb-3" {...props} />;
  },
  table: (props: any) => (
    <div className="my-8 w-full overflow-x-auto rounded-2xl border border-black/10 shadow-sm bg-white">
      <table className="w-full text-left border-collapse font-sans text-sm text-charcoal" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-charcoal text-white text-xs uppercase tracking-wider font-display font-bold" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="divide-y divide-black/5 bg-white font-sans text-sm text-black/80" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-gold/5 transition-colors" {...props} />
  ),
  th: (props: any) => (
    <th className="py-4 px-5 font-bold border-b border-black/10 text-white" {...props} />
  ),
  td: (props: any) => (
    <td className="py-4 px-5 border-b border-black/5 align-top leading-relaxed" {...props} />
  ),
};

export default function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote source={source} components={components} />;
}
