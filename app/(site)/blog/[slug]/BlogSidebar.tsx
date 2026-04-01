"use client";
import { useState } from "react";
import { Twitter, Facebook, Linkedin } from "lucide-react";

interface BlogSidebarProps {
  postUrl: string;
  postTitle: string;
}

export default function BlogSidebar({ postUrl, postTitle }: BlogSidebarProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const share = (platform: "twitter" | "facebook" | "linkedin") => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    };
    window.open(urls[platform], "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      {/* Share box */}
      <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/40 mb-4">
          Share This Article
        </p>
        <div className="flex gap-2">
          {[
            { platform: "twitter" as const, Icon: Twitter, label: "Share on Twitter" },
            { platform: "facebook" as const, Icon: Facebook, label: "Share on Facebook" },
            { platform: "linkedin" as const, Icon: Linkedin, label: "Share on LinkedIn" },
          ].map(({ platform, Icon, label }) => (
            <button
              key={platform}
              onClick={() => share(platform)}
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Subscribe box */}
      <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/40 mb-2">
          Stay Updated
        </p>
        <p className="text-[14px] text-black/50 leading-relaxed mb-5">
          Get the latest Dubai real estate insights delivered to your inbox.
        </p>

        {status === "success" ? (
          <p className="text-[13px] text-black font-medium">You&apos;re subscribed!</p>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 bg-[#f9f9f9] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-black text-white text-[13px] font-semibold tracking-widest uppercase py-3 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
            {status === "error" && (
              <p className="text-[12px] text-red-500">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
