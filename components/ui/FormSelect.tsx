"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function FormSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  required = false,
  className,
}: FormSelectProps) {
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

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <label className="block font-body text-[11px] text-gray-400 mb-0.5 tracking-wide uppercase font-bold">
        {label} {required && "*"}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between bg-transparent border-b border-gray-200 text-black font-body text-[15px] py-3.5 outline-none transition-colors text-left group",
          isOpen ? "border-gray-500" : "hover:border-gray-300"
        )}
      >
        <span className={cn(
          "truncate pr-4 transition-opacity",
          !value && "text-gray-400"
        )}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={14} 
          className={cn(
            "text-gray-400 group-hover:text-gray-600 transition-transform duration-300 shrink-0",
            isOpen && "rotate-180 text-gray-600"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 right-0 top-full bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/[0.04] z-[100] mt-2 overflow-hidden py-2"
          >
            <div className="max-h-[260px] overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-5 py-3 text-[14px] font-body transition-colors",
                    value === option
                      ? "bg-black/[0.03] text-black font-semibold"
                      : "text-gray-600 hover:bg-black/[0.02] hover:text-black"
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
