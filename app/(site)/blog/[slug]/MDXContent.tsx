// Remove unused client directive and convert to server component mapping where possible, but since next-contentlayer exposes hooks we keep it. Wait, useMDXComponent uses useMemo internally which requires React hooks. So let's keep "use client" but remove React.memo inside it if there. 
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MDXRemote } from "next-mdx-remote/rsc";

// Custom callout box for MDX: <Callout type="tip">text</Callout>
function Callout({ type = "tip", children }: { type?: "tip" | "info" | "warning"; children: React.ReactNode }) {
  const styles = {
    tip: { border: "border-l-[3px] border-emerald-500", bg: "bg-emerald-50", label: "Pro Tip", labelColor: "text-emerald-700" },
    info: { border: "border-l-[3px] border-blue-500", bg: "bg-blue-50", label: "Note", labelColor: "text-blue-700" },
    warning: { border: "border-l-[3px] border-amber-400", bg: "bg-amber-50", label: "Important", labelColor: "text-amber-700" },
  };
  const s = styles[type] || styles.tip;
  return (
    <div className={`my-6 px-5 py-4 ${s.bg} ${s.border}`}>
      <p className={`text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5 ${s.labelColor}`}>{s.label}</p>
      <div className="text-[14px] text-black/70 leading-relaxed [&>p]:mb-0 [&>p]:text-black/70">{children}</div>
    </div>
  );
}

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  // Handle placeholders in text
  let children = props.children;
  if (typeof children === "string") {
    if (children.includes("[WhatsApp Number]")) {
      return (
        <a 
          href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 font-bold hover:underline"
        >
          {siteConfig.contact.phone} (WhatsApp)
        </a>
      );
    }
  }

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export default function MDXContent({ code }: { code: string }) {
  return (
    <MDXRemote
      source={code}
      components={{
        a: CustomLink,
        Callout,
        img: (props: any) => (
          <div className="my-8 overflow-hidden rounded-xl">
            <Image {...props} alt={props.alt || ""} width={800} height={450} className="w-full object-cover" />
          </div>
        ),
      }}
    />
  );
}
