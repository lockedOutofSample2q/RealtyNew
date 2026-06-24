"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down 300px and stop showing near bottom so it doesn't overlap footer
      const bottomOffset = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      if (window.scrollY > 300 && bottomOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white/90 backdrop-blur-md border-t border-border z-40 md:hidden animate-fade-up">
      <Button size="lg" asChild className="w-full shadow-elevated">
        <a href="#book">Book a free 15-minute call</a>
      </Button>
    </div>
  );
}
