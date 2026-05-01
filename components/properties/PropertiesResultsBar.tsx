"use client";

interface PropertiesResultsBarProps {
  count: number;
}

export function PropertiesResultsBar({ count }: PropertiesResultsBarProps) {
  return (
    <div className="border-b border-black/6 px-6 py-4 flex items-center mt-12">
      <span className="text-[13px] text-black/50 font-medium">
        {count} {count === 1 ? "property" : "properties"}
      </span>
    </div>
  );
}
