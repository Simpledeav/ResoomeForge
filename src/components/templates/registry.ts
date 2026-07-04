import type { ComponentType } from "react";
import type { Resume } from "@/lib/schema";
import type { TemplateProps } from "./shared/types";

import { Chronos } from "./ats-safe/Chronos";
import { Executive } from "./ats-safe/Executive";
import { Compact } from "./ats-safe/Compact";
import { Clean } from "./ats-safe/Clean";

import { Minimal } from "./modern/Minimal";
import { Sidebar } from "./modern/Sidebar";
import { Split } from "./modern/Split";
import { Apex } from "./modern/Apex";

import { Creative } from "./creative/Creative";
import { Bold } from "./creative/Bold";
import { Vibrant } from "./creative/Vibrant";
import { Element } from "./creative/Element";

interface TemplateDefinition {
  id: string;
  name: string;
  category: "ats-safe" | "modern" | "creative";
  description: string;
  component: ComponentType<TemplateProps>;
  preview: string;
}

export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  // ── ATS-Safe ──
  {
    id: "chronos",
    name: "Chronos",
    category: "ats-safe",
    description: "Classic reverse-chronological layout. The ATS gold standard.",
    component: Chronos,
    preview: "bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800",
  },
  {
    id: "executive",
    name: "Executive",
    category: "ats-safe",
    description: "Two-column layout with sidebar. Built for senior leaders.",
    component: Executive,
    preview: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
  },
  {
    id: "compact",
    name: "Compact",
    category: "ats-safe",
    description: "Single-page dense layout for experienced professionals.",
    component: Compact,
    preview: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
  },
  {
    id: "clean",
    name: "Clean",
    category: "ats-safe",
    description: "Elegant, minimal layout with generous whitespace.",
    component: Clean,
    preview: "bg-gradient-to-br from-stone-50 to-neutral-50 dark:from-stone-950/30 dark:to-neutral-950/30",
  },

  // ── Modern ──
  {
    id: "minimal",
    name: "Minimal",
    category: "modern",
    description: "Whitespace-driven design with clean typography.",
    component: Minimal,
    preview: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    category: "modern",
    description: "Skills-first layout with a colored accent sidebar.",
    component: Sidebar,
    preview: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
  },
  {
    id: "split",
    name: "Split",
    category: "modern",
    description: "50/50 balanced two-column layout.",
    component: Split,
    preview: "bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30",
  },
  {
    id: "apex",
    name: "Apex",
    category: "modern",
    description: "Inverted header bar with sidebar content structure.",
    component: Apex,
    preview: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30",
  },

  // ── Creative ──
  {
    id: "creative",
    name: "Creative",
    category: "creative",
    description: "Bold gradient header and modern typography.",
    component: Creative,
    preview: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
  },
  {
    id: "bold",
    name: "Bold",
    category: "creative",
    description: "High-contrast, large headers for maximum impact.",
    component: Bold,
    preview: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
  },
  {
    id: "vibrant",
    name: "Vibrant",
    category: "creative",
    description: "Colorful accent-heavy design with visual energy.",
    component: Vibrant,
    preview: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
  },
  {
    id: "element",
    name: "Element",
    category: "creative",
    description: "Clean creative with subtle design details and hierarchy.",
    component: Element,
    preview: "bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30",
  },
];

export function getTemplateById(id: string): TemplateDefinition | undefined {
  return TEMPLATE_REGISTRY.find((t) => t.id === id);
}

export function getTemplatesByCategory(
  category: TemplateDefinition["category"],
): TemplateDefinition[] {
  return TEMPLATE_REGISTRY.filter((t) => t.category === category);
}
