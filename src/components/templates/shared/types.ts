import type { Resume, MonthYear, SectionVisibility } from "@/lib/schema";

export interface TemplateProps {
  resume: Resume;
  accentColor?: string;
  font?: string;
  showPhoto?: boolean;
  columns?: 1 | 2;
}

export interface TemplateComponentProps {
  resume: Resume;
  sections: SectionVisibility;
}

export function formatMonthYear(date: MonthYear): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[date.month - 1]} ${date.year}`;
}

export function formatDateRange(
  start: MonthYear,
  end?: MonthYear,
  current?: boolean,
): string {
  if (current) return `${formatMonthYear(start)} – Present`;
  if (end) return `${formatMonthYear(start)} – ${formatMonthYear(end)}`;
  return formatMonthYear(start);
}

export function getFontFamily(font: string): string {
  const fonts: Record<string, string> = {
    geist: "var(--font-geist-sans)",
    inter: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  };
  return fonts[font] || fonts.geist;
}
