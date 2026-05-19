// app/site/layout.tsx
// ============================================================
// PUBLIC SITE LAYOUT
// Wraps all public-facing pages with Navbar + Footer
// ============================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { Suspense } from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeaderProvider>
      <CurrencyProvider>
        <Suspense fallback={<div className="h-[var(--nav-height)] bg-white w-full border-b border-black/6"></div>}>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </CurrencyProvider>
    </HeaderProvider>
  );
}
