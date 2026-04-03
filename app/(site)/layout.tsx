// app/site/layout.tsx
// ============================================================
// PUBLIC SITE LAYOUT
// Wraps all public-facing pages with Navbar + Footer
// ============================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </CurrencyProvider>
  );
}
