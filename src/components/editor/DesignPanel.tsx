"use client";

import { useResumeStore } from "@/lib/store";
import { TEMPLATE_REGISTRY } from "@/components/templates/registry";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const COLOR_SWATCHES = [
  "#000000", "#1a1a2e", "#16213e", "#0f3460",
  "#0070f3", "#0066cc", "#0055aa", "#004488",
  "#6b21a8", "#7c3aed", "#6366f1", "#3b82f6",
  "#059669", "#10b981", "#0891b2", "#06b6d4",
  "#dc2626", "#ef4444", "#ea580c", "#f97316",
];

const FONT_OPTIONS = [
  { value: "geist", label: "Geist" },
  { value: "inter", label: "Inter" },
  { value: "mono", label: "Geist Mono" },
];

const FONT_SIZES = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const SPACING_OPTIONS = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Standard" },
  { value: "spacious", label: "Spacious" },
];

const MARGIN_OPTIONS = [
  { value: "small", label: "Compact" },
  { value: "normal", label: "Standard" },
  { value: "large", label: "Generous" },
];

export function DesignPanel() {
  const meta = useResumeStore((s) => s.currentResume.meta);
  const updateMeta = useResumeStore((s) => s.updateMeta);

  return (
    <div className="flex flex-col gap-5">
      {/* Template Switcher */}
      <div className="flex flex-col gap-2">
        <Label>Template</Label>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATE_REGISTRY.map((t) => (
            <button
              key={t.id}
              onClick={() => updateMeta({ template: t.id })}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg border p-2 transition-all",
                meta.template === t.id
                  ? "border-foreground bg-foreground/5 ring-1 ring-foreground/20"
                  : "border-border hover:border-foreground/50",
              )}
            >
              <div
                className={`w-full h-10 rounded-md ${t.preview} flex items-center justify-center`}
              >
                <span className="text-[7px] font-medium text-muted-foreground uppercase tracking-wider">
                  {t.name}
                </span>
              </div>
              <span className="text-[9px] text-muted-foreground text-center leading-tight">
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Color Picker */}
      <div className="flex flex-col gap-2">
        <Label>Accent Color</Label>
        <div className="flex flex-wrap gap-1.5">
          {COLOR_SWATCHES.map((color) => (
            <button
              key={color}
              onClick={() => updateMeta({ color })}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-all",
                meta.color === color
                  ? "border-foreground scale-110 shadow-md"
                  : "border-transparent hover:scale-110 hover:shadow-sm",
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Input
            type="text"
            value={meta.color}
            onChange={(e) => updateMeta({ color: e.target.value })}
            className="h-7 text-xs font-mono flex-1"
            placeholder="#000000"
          />
          <div
            className="w-8 h-7 rounded-md border border-border shrink-0"
            style={{ backgroundColor: meta.color }}
          />
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Font Selector */}
      <div className="flex flex-col gap-2">
        <Label>Font</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.value}
              onClick={() => updateMeta({ font: font.value })}
              className={cn(
                "rounded-md border px-2 py-1.5 text-xs transition-all",
                meta.font === font.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50",
              )}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="flex flex-col gap-2">
        <Label>Font Size</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {FONT_SIZES.map((size) => (
            <button
              key={size.value}
              onClick={() => updateMeta({ fontSize: size.value as "small" | "medium" | "large" })}
              className={cn(
                "rounded-md border px-2 py-1.5 text-xs transition-all",
                meta.fontSize === size.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50",
              )}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Spacing */}
      <div className="flex flex-col gap-2">
        <Label>Section Spacing</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {SPACING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateMeta({ spacing: opt.value as "compact" | "normal" | "spacious" })}
              className={cn(
                "rounded-md border px-2 py-1.5 text-xs transition-all",
                meta.spacing === opt.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Margins */}
      <div className="flex flex-col gap-2">
        <Label>Margins</Label>
        <div className="grid grid-cols-3 gap-1.5">
          {MARGIN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateMeta({ margin: opt.value as "small" | "normal" | "large" })}
              className={cn(
                "rounded-md border px-2 py-1.5 text-xs transition-all",
                meta.margin === opt.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/50",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
