"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "All",
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayValue = value || placeholder;

  return (
    <div className={cn("relative flex-1 w-full min-w-0", className)} ref={containerRef}>
      <label className="block text-left text-[10px] font-body font-semibold text-white/40 mb-1.5 pl-1 uppercase tracking-widest leading-none">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-full flex items-center justify-between bg-white/[0.08] hover:bg-white/[0.13] transition-all rounded-xl px-4 py-3 border border-white/[0.08] text-left outline-none group",
          isOpen && "bg-white/[0.18] border-white/20"
        )}
      >
        <span className="text-white font-body text-sm font-medium truncate pr-2">
          {displayValue}
        </span>
        <ChevronDown 
          size={14} 
          className={cn(
            "text-white/40 group-hover:text-white/70 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-black/5 z-[100] overflow-hidden py-2"
          >
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option === placeholder ? "" : option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-5 py-3 text-[14px] font-body transition-colors",
                    (value === option || (value === "" && option === placeholder))
                      ? "bg-black/5 text-black font-semibold"
                      : "text-black/60 hover:bg-black/[0.03] hover:text-black"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
