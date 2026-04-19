"use client";

import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// Custom callout box for MDX: <Callout type="tip">text</Callout>
function Callout({ type = "tip", children }: { type?: "tip" | "info" | "warning" | "advisory"; children: React.ReactNode }) {
  const styles = {
    tip: { border: "border-l-[3px] border-emerald-500", bg: "bg-emerald-50", label: "Pro Tip", labelColor: "text-emerald-700" },
    info: { border: "border-l-[3px] border-blue-500", bg: "bg-blue-50", label: "Note", labelColor: "text-blue-700" },
    warning: { border: "border-l-[3px] border-amber-400", bg: "bg-amber-50", label: "Important", labelColor: "text-amber-700" },
    advisory: { border: "border-l-[3px] border-black", bg: "bg-black/[0.03]", label: "The Advisory Take", labelColor: "text-black" },
  };
  const s = styles[type] || styles.tip;
  return (
    <div className={`my-8 px-6 py-5 ${s.bg} ${s.border} rounded-r-xl`}>
      <p className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-2 ${s.labelColor}`}>{s.label}</p>
      <div className="text-[15px] text-black/80 leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}

const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  let children = props.children;
  if (typeof children === "string" && children.includes("[WhatsApp Number]")) {
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

  if (isInternalLink) {
    return (
      <Link href={href} {...props} className="text-black font-semibold underline decoration-black/10 hover:decoration-black transition-all">
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props} className="text-black font-semibold underline decoration-black/10 hover:decoration-black transition-all">
      {children}
    </a>
  );
};

export default function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <Component
      components={{
        a: CustomLink,
        Callout,
        img: (props: any) => (
          <div className="my-10 overflow-hidden rounded-2xl shadow-lg">
            <Image {...props} alt={props.alt || ""} width={1200} height={600} className="w-full object-cover" />
          </div>
        ),
        ProTip: ({ children }: { children: React.ReactNode }) => <Callout type="tip">{children}</Callout>,
      }}
    />
  );
}
