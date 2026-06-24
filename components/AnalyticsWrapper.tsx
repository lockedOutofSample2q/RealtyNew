"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

export default function AnalyticsWrapper() {
  const pathname = usePathname();

  // Do not render analytics on admin pages
  if (pathname?.startsWith("/admin-realty-8x2d9")) {
    return null;
  }

  return (
    <>
      {/* Ahrefs Analytics */}
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="Qm6W5Qeb+IdgA8tRuYFgHQ"
        strategy="lazyOnload"
      />
      <GoogleAnalytics gaId="G-ZWNKTZ1M1S" />
      <GoogleTagManager gtmId="GTM-5Z6V8R4V" />
      <Script id="clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xbwp2jr906");
        `}
      </Script>
    </>
  );
}
