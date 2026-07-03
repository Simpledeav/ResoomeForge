"use client";

import { useResumeStore } from "@/lib/store";
import { getTemplateById } from "./registry";
import { SAMPLE_RESUME } from "./shared/sample-data";

interface TemplateRendererProps {
  resumeId?: string;
  useSampleData?: boolean;
  className?: string;
  scalable?: boolean;
}

export function TemplateRenderer({
  resumeId,
  useSampleData = false,
  className = "",
  scalable = false,
}: TemplateRendererProps) {
  const currentResume = useResumeStore((s) => s.currentResume);
  const resume = useSampleData ? SAMPLE_RESUME : currentResume;
  const templateId = resume.meta.template || "chronos";
  const templateDef = getTemplateById(templateId);

  if (!templateDef) {
    return (
      <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
        Template &quot;{templateId}&quot; not found
      </div>
    );
  }

  const TemplateComponent = templateDef.component;

  return (
    <div
      className={`bg-background text-foreground ${scalable ? "origin-top-left" : ""} ${className}`}
      style={
        scalable
          ? {
              width: 816, // US Letter width in px at 72dpi
              transform: "scale(var(--scale, 1))",
              transformOrigin: "top left",
            }
          : undefined
      }
    >
      <TemplateComponent resume={resume} />
    </div>
  );
}
