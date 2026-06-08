"use client";

import { useState } from "react";

interface DescriptionContainerProps {
  description: string;
}

export default function DescriptionContainer({ description }: DescriptionContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  const paragraphs = description.split('\n').filter(p => p.trim());
  
  // Count total words across all paragraphs
  const words = description.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  // If the description has 100 words or fewer, render it normally without expand/collapse
  if (totalWords <= 100) {
    return (
      <div className="space-y-4 mb-8">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-[15px] text-black/60 leading-relaxed font-sans">
            {para}
          </p>
        ))}
      </div>
    );
  }

  // Generate truncated paragraphs to fit exactly 100 words
  let wordCounter = 0;
  const truncatedParagraphs: string[] = [];

  for (const para of paragraphs) {
    const paraWords = para.split(/\s+/).filter(Boolean);
    if (wordCounter + paraWords.length <= 100) {
      truncatedParagraphs.push(para);
      wordCounter += paraWords.length;
    } else {
      const remainingWordsNeeded = 100 - wordCounter;
      if (remainingWordsNeeded > 0) {
        const truncatedPara = paraWords.slice(0, remainingWordsNeeded).join(" ") + "...";
        truncatedParagraphs.push(truncatedPara);
      }
      break;
    }
  }

  const displayedParagraphs = isExpanded ? paragraphs : truncatedParagraphs;

  return (
    <div className="mb-8 font-sans">
      <div className="space-y-4">
        {displayedParagraphs.map((para, i) => (
          <p 
            key={i} 
            className="text-[15px] text-black/60 leading-relaxed transition-opacity duration-300"
          >
            {para}
          </p>
        ))}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 text-[14px] font-bold text-[#8B7355] hover:text-[#705C44] transition-colors focus:outline-none flex items-center gap-1"
      >
        {isExpanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}
