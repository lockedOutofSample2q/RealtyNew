"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

interface Props {
  images: string[];
  title: string;
  imageCount?: number;
}

export default function PropertyGallery({ images, title, imageCount }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = images.length;

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + total) % total)), [total]);
  const next = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % total)), [total]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const displayCount = imageCount ?? total;

  return (
    <>
      {/* ── Gallery Grid ─────────────────────────────────── */}
      <div className="flex gap-1 h-[420px]">
        {/* Main image */}
        <button
          onClick={() => open(0)}
          className="relative flex-1 overflow-hidden rounded-l-2xl bg-black/5 cursor-zoom-in"
        >
          <Image
            src={images[0] ?? "/assets/images/home/about.jpg"}
            alt={title}
            fill
            className="object-cover hover:scale-[1.02] transition-transform duration-500"
            priority
          />
        </button>

        {/* 2×2 thumbnails */}
        <div className="grid grid-cols-2 gap-1 w-[340px] shrink-0">
          {[1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => open(i < total ? i : 0)}
              className={`relative overflow-hidden bg-black/5 cursor-zoom-in
                ${i === 2 ? "rounded-tr-2xl" : ""}
                ${i === 4 ? "rounded-br-2xl" : ""}
              `}
            >
              {images[i] ? (
                <Image
                  src={images[i]}
                  alt={`${title} ${i + 1}`}
                  fill
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-black/5" />
              )}

              {/* "View all" overlay on last thumb */}
              {i === 4 && displayCount > 5 && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1.5 hover:bg-black/60 transition-colors">
                  <Images size={18} className="text-white" />
                  <span className="text-white text-[12px] font-semibold">
                    View all
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-[13px] font-mono z-10">
            {lightboxIndex + 1} / {total}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} — image ${lightboxIndex + 1}`}
              width={1400}
              height={900}
              className="object-contain max-h-[85vh] w-full rounded-xl"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>

          {/* Thumbnail strip */}
          {total > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 pb-1">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
