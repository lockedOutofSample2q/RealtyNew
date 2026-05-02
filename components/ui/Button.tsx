import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-charcoal text-white hover:bg-black/80": variant === "primary",
            "border border-border bg-white text-charcoal hover:bg-charcoal/5": variant === "secondary",
            "border border-white/20 bg-transparent text-white hover:bg-white hover:text-charcoal": variant === "outline",
            "text-charcoal hover:bg-charcoal/5 hover:text-charcoal": variant === "ghost",
            "h-9 px-4 rounded-md": size === "sm",
            "h-12 px-6 rounded-lg": size === "md",
            "h-14 px-8 rounded-xl text-base": size === "lg",
            "h-12 w-12 rounded-full": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
