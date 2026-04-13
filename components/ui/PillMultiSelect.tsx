"use client";
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PillMultiSelectProps {
  label: string;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function PillMultiSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "All",
  className,
}: PillMultiSelectProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/40 pl-1">
        {label}
      </label>
      
      <div className="flex flex-wrap gap-2 pt-1 px-1">
        {options.map((option) => {
          const isActive = value.includes(option) || (value.length === 0 && (option === placeholder || (placeholder === "Any" && option === "Any")));
          
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (option === placeholder || (placeholder === "Any" && option === "Any")) {
                  onChange([]);
                  return;
                }
                
                if (value.includes(option)) {
                  onChange(value.filter(v => v !== option));
                } else {
                  onChange([...value.filter(v => v !== placeholder && v !== "Any"), option]);
                }
              }}
              className={cn(
                "flex items-center gap-2 px-6 py-3.5 rounded-full font-body text-[14px] font-semibold transition-all duration-300",
                isActive 
                  ? "bg-black text-white shadow-xl scale-[1.03]" 
                  : "bg-white text-black/40 border border-black/5 hover:border-black/10 active:scale-95"
              )}
            >
              {isActive && <Check size={14} strokeWidth={3} className="shrink-0" />}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}