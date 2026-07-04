"use client";

import { useResumeStore } from "@/lib/store";
import { getTemplateById } from "./registry";
import { SAMPLE_RESUME } from "./shared/sample-data";
import { getFontFamily } from "./shared/types";

interface TemplateRendererProps {
  resumeId?: string;
  useSampleData?: boolean;
  className?: string;
  scalable?: boolean;
  accentColor?: string;
  showPhoto?: boolean;
  columns?: 1 | 2;
}

export function TemplateRenderer({
  resumeId,
  useSampleData = false,
  className = "",
  scalable = false,
  accentColor,
  showPhoto,
  columns,
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
  const color = accentColor ?? resume.meta.color;

  // Build CSS custom properties for the design settings
  const designVars: React.CSSProperties = {
    "--accent-color": color,
    "--font-family": getFontFamily(resume.meta.font),
    "--font-size-base": resume.meta.fontSize === "small" ? "8.5px" : resume.meta.fontSize === "large" ? "11.5px" : "10px",
    "--font-size-heading": resume.meta.fontSize === "small" ? "10px" : resume.meta.fontSize === "large" ? "14px" : "12px",
    "--section-spacing": resume.meta.spacing === "compact" ? "0.75rem" : resume.meta.spacing === "spacious" ? "1.5rem" : "1rem",
    "--margin": resume.meta.margin === "small" ? "0.5in" : resume.meta.margin === "large" ? "1in" : "0.75in",
  } as React.CSSProperties;

  return (
    <div
      className={`bg-background text-foreground ${className}`}
      style={{
        ...designVars,
        ...(scalable
          ? {
              width: 816,
              transform: "scale(var(--scale, 1))",
              transformOrigin: "top left",
            }
          : {}),
      }}
    >
      <TemplateComponent
        resume={resume}
        accentColor={color}
        font={resume.meta.font}
        showPhoto={showPhoto}
        columns={columns}
        wrapperStyle={{
          fontFamily: getFontFamily(resume.meta.font),
          fontSize: resume.meta.fontSize === "small" ? "8.5px" : resume.meta.fontSize === "large" ? "11.5px" : "10px",
          gap: resume.meta.spacing === "compact" ? "0.75rem" : resume.meta.spacing === "spacious" ? "1.5rem" : "1rem",
          padding: resume.meta.margin === "small" ? "0.5in" : resume.meta.margin === "large" ? "1in" : "0.75in",
        }}
      />
    </div>
  );
}
