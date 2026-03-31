// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-[10rem] text-white/5 font-light leading-none select-none mb-0">
          404
        </div>
        <h1 className="font-display text-3xl text-white font-light -mt-8 mb-4">
          Page not found
        </h1>
        <p className="font-body text-white/50 text-sm mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist. It may have moved or the URL may be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-8 py-3 bg-[var(--gold)] text-black font-body font-medium text-sm hover:bg-[var(--gold-light)] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-white/15 text-white/60 font-body text-sm hover:text-white hover:border-white/30 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
