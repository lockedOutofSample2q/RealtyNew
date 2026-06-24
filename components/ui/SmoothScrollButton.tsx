"use client";

import { Button, ButtonProps } from "@/components/ui/Button";

interface SmoothScrollButtonProps extends ButtonProps {
  targetId: string;
}

export function SmoothScrollButton({ targetId, children, onClick, ...props }: SmoothScrollButtonProps) {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    // Calculate position taking into account possible fixed headers
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 350; // Swoosh duration
    let start: number | null = null;

    // Cinematic easeInOutQuart easing function
    // Starts slow, accelerates, then gracefully slows down to exactly the target
    const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const animation = (currentTime: number) => {
      if (start === null) {
        start = currentTime;
        // Inject SVG if it doesn't exist
        if (!document.getElementById("vertical-motion-blur-svg")) {
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.id = "vertical-motion-blur-svg";
          svg.style.display = "none";
          svg.innerHTML = '<filter id="vertical-motion-blur"><feGaussianBlur stdDeviation="0 15" /></filter>';
          document.body.appendChild(svg);
        }
        
        // Apply TRUE vertical motion blur
        document.body.style.transition = "none"; // Remove transition so it hits immediately
        document.body.style.filter = "url(#vertical-motion-blur)";
      }
      
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutQuart(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // Remove blur instantly to simulate landing hard
        document.body.style.filter = "none";
      }
    };

    requestAnimationFrame(animation);
    onClick?.(e);
  };

  return (
    <Button onClick={handleScroll} {...props}>
      {children}
    </Button>
  );
}
