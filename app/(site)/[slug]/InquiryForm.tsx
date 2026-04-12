"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play, Images, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── PROPERTY GALLERY COMPONENT ──────────────────────────────
interface PropertyGalleryProps {
  images: string[];
  videos?: string[];
  title: string;
  imageCountOverride?: number;
}

interface MediaItem {
  type: "image" | "video";
  url: string;
}

export function PropertyGallery({ images, videos = [], title, imageCountOverride }: PropertyGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  const mediaItems = useMemo(() => {
    const items: MediaItem[] = [];
    videos.forEach(v => items.push({ type: "video", url: v }));
    images.forEach(img => items.push({ type: "image", url: img }));
    return items;
  }, [images, videos]);

  const totalCount = imageCountOverride || mediaItems.length;

  const handlePrev = useCallback(() => {
    setIndex(prev => (prev !== null ? (prev - 1 + mediaItems.length) % mediaItems.length : null));
  }, [mediaItems.length]);

  const handleNext = useCallback(() => {
    setIndex(prev => (prev !== null ? (prev + 1) % mediaItems.length : null));
  }, [mediaItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, handlePrev, handleNext]);

  return (
    <div className="py-4 select-none">
      <div className="flex gap-1 h-[260px] sm:h-[340px] md:h-[420px]">
        <div 
          onClick={() => setIndex(0)}
          className="relative flex-1 overflow-hidden rounded-2xl md:rounded-l-2xl md:rounded-r-none bg-black/5 cursor-pointer group"
        >
          {mediaItems[0] ? (
            <>
              <MediaThumbnail item={mediaItems[0]} title={title} className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              {mediaItems[0].type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110">
                    <Play size={24} fill="white" />
                  </div>
                </div>
              )}
            </>
          ) : (
             <div className="w-full h-full bg-black/5" />
          )}
        </div>

        <div className="hidden md:grid grid-cols-2 gap-1 w-[340px] shrink-0">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              onClick={() => setIndex(i)}
              className={cn(
                "relative overflow-hidden bg-black/5 cursor-pointer group",
                i === 2 && "rounded-tr-2xl",
                i === 4 && "rounded-br-2xl"
              )}
            >
              {mediaItems[i] ? (
                <>
                  <MediaThumbnail item={mediaItems[i]} title={`${title} ${i}`} className="transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  {mediaItems[i].type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                        <Play size={14} fill="white" />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-black/5" />
              )}

              {i === 4 && (
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-1.5 backdrop-blur-[2px]">
                  <Images size={20} className="text-white" />
                  <span className="text-white text-[13px] font-bold tracking-tight">
                    View all {totalCount}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 focus:outline-none"
          >
            <div className="absolute top-6 left-6 flex items-center gap-4 text-white z-[110]">
               <div className="text-[14px] font-bold tracking-wider opacity-60">{index + 1} / {mediaItems.length}</div>
               <div className="h-4 w-[1px] bg-white/20" />
               <div className="text-[13px] font-medium text-white/90">{title}</div>
            </div>

            <button onClick={() => setIndex(null)} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"><X size={24} /></button>

            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/40 hover:text-white transition-colors z-[110]"><ChevronLeft size={44} strokeWidth={1.5} /></button>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/40 hover:text-white transition-colors z-[110]"><ChevronRight size={44} strokeWidth={1.5} /></button>

            <div className="relative w-full h-full flex items-center justify-center" onClick={() => setIndex(null)}>
              <div className="relative max-w-6xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {mediaItems[index].type === "video" ? (
                      <VideoPlayer url={mediaItems[index].url} />
                    ) : (
                      <div className="relative w-full h-full">
                        <Image src={mediaItems[index].url} alt={title} fill className="object-contain" quality={100} priority />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MediaThumbnail({ item, title, className }: { item: MediaItem; title: string; className?: string }) {
  if (!item) return null;
  let src = item.url;
  if (item.type === "video") {
    const ytId = getYouTubeId(item.url);
    if (ytId) src = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    else return <div className={cn("w-full h-full bg-black flex items-center justify-center text-white/20", className)}><Play size={32} /></div>;
  }
  return <Image src={src} alt={title} fill className={cn("object-cover", className)} />;
}

function VideoPlayer({ url }: { url: string }) {
  const ytId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);
  const common = "w-full max-w-[1200px] aspect-video rounded-2xl shadow-2xl overflow-hidden bg-black";
  if (ytId) return <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} className={common} allow="autoplay; encrypted-media" allowFullScreen />;
  if (vimeoId) return <iframe src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`} className={common} allow="autoplay; fullscreen" allowFullScreen />;
  return <video src={url} controls autoPlay className="max-w-full max-h-full rounded-2xl shadow-2xl" />;
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getVimeoId(url: string) {
  const regExp = /vimeo\.com\/(?:video\/)?(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// ── INQUIRY FORM COMPONENT (Original) ───────────────────────
const COUNTRY_CODES = [
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+44",  label: "🇬🇧 +44" },
  { code: "+1",   label: "🇺🇸 +1" },
  { code: "+91",  label: "🇮🇳 +91" },
  { code: "+33",  label: "🇫🇷 +33" },
  { code: "+49",  label: "🇩🇪 +49" },
  { code: "+7",   label: "🇷🇺 +7" },
  { code: "+86",  label: "🇨🇳 +86" },
];

export default function InquiryForm({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [countryCode, setCountryCode] = useState("+971");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const phone = `${countryCode} ${fd.get("phone_number")}`;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone,
          source: "property",
          property_id: propertyId,
          message: `Inquiry about: ${propertyTitle}`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full border border-black/10 rounded-xl px-3 py-2.5 text-[13px] text-black placeholder:text-black/30 focus:outline-none focus:border-black/30 bg-[#f9f9f9] transition-colors";

  if (status === "success") {
    return (
      <div className="py-6 text-center">
        <p className="text-[14px] font-semibold text-black mb-1">Request sent!</p>
        <p className="text-[13px] text-black/50">We'll be in touch within the hour.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" name="name" placeholder="Full name" required className={input} />
      <input type="email" name="email" placeholder="Email address" required className={input} />
      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="border border-black/10 rounded-xl px-2 py-2.5 text-[13px] text-black bg-[#f9f9f9] focus:outline-none focus:border-black/30 shrink-0"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <input type="tel" name="phone_number" placeholder="Phone number" className={`${input} flex-1`} />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-black text-white text-[13px] font-semibold py-3 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request Information"}
      </button>
      {status === "error" && (
        <p className="text-[12px] text-red-500 text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
