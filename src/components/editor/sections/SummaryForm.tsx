"use client";

import { useResumeStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SummaryForm() {
  const summary = useResumeStore((s) => s.currentResume.summary);
  const updateSummary = useResumeStore((s) => s.updateSummary);

  const charCount = summary.length;
  const maxChars = 2000;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <textarea
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write a brief professional summary highlighting your key qualifications and career objectives..."
          maxLength={maxChars}
          rows={5}
          className="w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">
          Highlight your top skills and experience in 3–4 sentences.
        </span>
        <span
          className={cn(
            "text-[11px] tabular-nums",
            charCount > maxChars * 0.9
              ? "text-warning"
              : "text-muted-foreground",
          )}
        >
          {charCount}/{maxChars}
        </span>
      </div>
    </div>
  );
}
