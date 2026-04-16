"use client";

import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

// Custom callout box for MDX: <Callout type="tip">text</Callout>
function Callout({ type = "tip", children }: { type?: "tip" | "info" | "warning"; children: React.ReactNode }) {
  const styles = {
    tip: { border: "border-l-[3px] border-emerald-500", bg: "bg-emerald-50", label: "Pro Tip", labelColor: "text-emerald-700" },
    info: { border: "border-l-[3px] border-blue-500", bg: "bg-blue-50", label: "Note", labelColor: "text-blue-700" },
    warning: { border: "border-l-[3px] border-amber-400", bg: "bg-amber-50", label: "Important", labelColor: "text-amber-700" },
  };
  const s = styles[type];
  return (
    <div className={`my-6 px-5 py-4 ${s.bg} ${s.border}`}>
      <p className={`text-[11px] font-bold tracking-[0.12em] uppercase mb-1.5 ${s.labelColor}`}>{s.label}</p>
      <div className="text-[14px] text-black/70 leading-relaxed [&>p]:mb-0 [&>p]:text-black/70">{children}</div>
    </div>
  );
}

export default function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <Component
      components={{
        img: ({ src, alt }: any) => (
          <div className="my-8 overflow-hidden">
            <Image
              src={src}
              alt={alt ?? ""}
              width={800}
              height={450}
              className="w-full object-cover"
            />
          </div>
        ),
        Callout,
        ProTip: ({ children }: { children: React.ReactNode }) => <Callout type="tip">{children}</Callout>,
      }}
    />
  );
}
