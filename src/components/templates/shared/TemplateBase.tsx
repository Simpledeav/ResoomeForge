import type { ReactNode } from "react";
import { formatDateRange } from "./types";
import type { MonthYear } from "@/lib/schema";

// ============================================================
// TYPES
// ============================================================

export interface AccentConfig {
  color?: string;
  /** CSS class override for the accent color */
  className?: string;
}

// ============================================================
// HEADING — section heading with optional divider line
// ============================================================

interface HeadingProps {
  children: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  divider?: boolean;
  className?: string;
}

const headingSizes = {
  sm: "text-[8px]",
  md: "text-[9px]",
  lg: "text-[10px]",
};

export function Heading({
  children,
  color = "text-muted-foreground",
  size = "md",
  divider = true,
  className = "",
}: HeadingProps) {
  return (
    <div className={`flex items-center gap-3 mb-2 ${className}`}>
      <h3
        className={`${headingSizes[size]} font-bold uppercase tracking-[0.1em] ${color} shrink-0`}
      >
        {children}
      </h3>
      {divider && <div className="flex-1 border-t border-border" />}
    </div>
  );
}

// ============================================================
// SECTION BLOCK — consistent section wrapper
// ============================================================

interface SectionBlockProps {
  children: ReactNode;
  className?: string;
}

export function SectionBlock({
  children,
  className = "",
}: SectionBlockProps) {
  return <div className={`mb-4 last:mb-0 ${className}`}>{children}</div>;
}

// ============================================================
// BULLET LIST — professional bullet points
// ============================================================

interface BulletListProps {
  items: string[];
  className?: string;
  spaced?: boolean;
}

export function BulletList({
  items,
  className = "",
  spaced = false,
}: BulletListProps) {
  const filtered = items.filter((b) => b.trim().length > 0);
  if (filtered.length === 0) return null;

  return (
    <ul
      className={`list-disc pl-[1.125rem] leading-relaxed ${spaced ? "space-y-1" : ""} ${className}`}
    >
      {filtered.map((item, i) => (
        <li key={i} className="pl-0.5">
          {item}
        </li>
      ))}
    </ul>
  );
}

// ============================================================
// DATE RANGE — consistent date display
// ============================================================

interface DateRangeProps {
  start: MonthYear;
  end?: MonthYear;
  current?: boolean;
  className?: string;
}

export function DateRange({
  start,
  end,
  current,
  className = "",
}: DateRangeProps) {
  const text = formatDateRange(start, end, current);
  if (!text) return null;

  return (
    <span className={`shrink-0 text-[9px] text-muted-foreground ${className}`}>
      {text}
    </span>
  );
}

// ============================================================
// CONTACT ROW — inline contact items with separators
// ============================================================

interface ContactRowProps {
  items: (string | false | null | undefined)[];
  className?: string;
  separator?: string;
}

export function ContactRow({
  items,
  className = "",
  separator = " · ",
}: ContactRowProps) {
  const filtered = items.filter(
    (item): item is string => typeof item === "string" && item.length > 0,
  );
  if (filtered.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap gap-x-[0.625rem] gap-y-0.5 text-[9px] text-muted-foreground ${className}`}
    >
      {filtered.map((item, i) => (
        <span key={i}>
          {item}
          {i < filtered.length - 1 && (
            <span className="ml-[0.625rem] opacity-40">{separator}</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ============================================================
// CONTACT LIST — vertical contact items for sidebars
// ============================================================

interface ContactListProps {
  items: (string | false | null | undefined)[];
  className?: string;
}

export function ContactList({
  items,
  className = "",
}: ContactListProps) {
  const filtered = items.filter(
    (item): item is string => typeof item === "string" && item.length > 0,
  );
  if (filtered.length === 0) return null;

  return (
    <div className={`flex flex-col gap-1 text-[10px] ${className}`}>
      {filtered.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  );
}

// ============================================================
// PROFILE PHOTO — optional round photo
// ============================================================

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function ProfilePhoto({
  src,
  alt = "Profile",
  size = 80,
  className = "",
}: ProfilePhotoProps) {
  if (!src) return null;

  return (
    <div className={`shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover border-2 border-border"
        style={{ width: size, height: size }}
      />
    </div>
  );
}

// ============================================================
// DIVIDER — horizontal rule
// ============================================================

interface DividerProps {
  className?: string;
  thick?: boolean;
}

export function Divider({ className = "", thick = false }: DividerProps) {
  return (
    <div
      className={`${thick ? "border-t-2" : "border-t"} border-border ${className}`}
    />
  );
}

// ============================================================
// SKILL TAG — skill badge/chip
// ============================================================

interface SkillTagProps {
  children: string;
  className?: string;
  variant?: "outline" | "filled" | "subtle";
}

export function SkillTag({
  children,
  className = "",
  variant = "outline",
}: SkillTagProps) {
  const variants = {
    outline:
      "border border-border bg-background text-foreground/80",
    filled:
      "bg-foreground text-background",
    subtle:
      "bg-muted text-muted-foreground",
  };

  if (!children.trim()) return null;

  return (
    <span
      className={`inline-block rounded-sm px-1.5 py-[1px] text-[8px] leading-relaxed ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// EXPERIENCE CARD — reusable experience entry
// ============================================================

interface ExperienceCardProps {
  position: string;
  company?: string;
  location?: string;
  startDate: MonthYear;
  endDate?: MonthYear;
  current?: boolean;
  bullets: string[];
  className?: string;
}

export function ExperienceCard({
  position,
  company,
  location,
  startDate,
  endDate,
  current,
  bullets,
  className = "",
}: ExperienceCardProps) {
  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="text-[10.5px] font-semibold text-foreground">
            {position || "Position"}
          </span>
          {company && (
            <span className="text-muted-foreground">
              {" "}— {company}
            </span>
          )}
        </div>
        <DateRange start={startDate} end={endDate} current={current} />
      </div>
      {location && (
        <p className="text-[9px] text-muted-foreground mt-[1px]">{location}</p>
      )}
      <BulletList items={bullets} className="mt-1 text-[10px]" />
    </div>
  );
}

// ============================================================
// EDUCATION CARD — reusable education entry
// ============================================================

interface EducationCardProps {
  school: string;
  degree?: string;
  field?: string;
  gpa?: string;
  honors?: string;
  startDate: MonthYear;
  endDate?: MonthYear;
  current?: boolean;
  className?: string;
}

export function EducationCard({
  school,
  degree,
  field,
  gpa,
  honors,
  startDate,
  endDate,
  current,
  className = "",
}: EducationCardProps) {
  const degreeField = [degree, field].filter(Boolean).join(" in ");
  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10.5px] font-medium text-foreground">
          {school || "School"}
        </span>
        <DateRange start={startDate} end={endDate} current={current} />
      </div>
      {degreeField && (
        <p className="text-[9.5px] text-muted-foreground">
          {degreeField}
          {gpa ? ` — GPA: ${gpa}` : ""}
        </p>
      )}
      {honors && (
        <p className="text-[8.5px] text-muted-foreground mt-[1px]">{honors}</p>
      )}
    </div>
  );
}

// ============================================================
// SKILLS SECTION — reusable skills display
// ============================================================

interface SkillsDisplayProps {
  skills: Array<{
    id: string;
    category?: string;
    skills: string[];
  }>;
  variant?: "inline" | "tags" | "columns";
  className?: string;
}

export function SkillsDisplay({
  skills,
  variant = "inline",
  className = "",
}: SkillsDisplayProps) {
  if (!skills || skills.length === 0) return null;

  if (variant === "tags") {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {skills.map((s) => (
          <div key={s.id}>
            {s.category && (
              <div className="text-[9px] font-medium mb-1">{s.category}</div>
            )}
            <div className="flex flex-wrap gap-1">
              {s.skills
                .filter((sk) => sk.trim())
                .map((sk, i) => (
                  <SkillTag key={i} variant="outline">
                    {sk}
                  </SkillTag>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "columns") {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {skills.map((s) => (
          <div key={s.id} className="text-[10px]">
            {s.category && (
              <span className="font-medium">{s.category}: </span>
            )}
            <span className="text-muted-foreground">
              {s.skills.filter(Boolean).join(", ")}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // inline — default
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {skills.map((s) => (
        <div key={s.id} className="flex gap-2">
          {s.category && (
            <span className="w-20 shrink-0 font-medium text-[9.5px]">
              {s.category}
            </span>
          )}
          <span className="text-[9.5px] text-foreground/85">
            {s.skills.filter(Boolean).join("  ·  ")}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// PROJECT CARD — reusable project entry
// ============================================================

interface ProjectCardProps {
  name: string;
  description?: string;
  technologies?: string[];
  url?: string;
  startDate?: MonthYear;
  endDate?: MonthYear;
  current?: boolean;
  className?: string;
}

export function ProjectCard({
  name,
  description,
  technologies,
  url,
  startDate,
  endDate,
  current,
  className = "",
}: ProjectCardProps) {
  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-medium text-foreground">
            {name || "Project"}
          </span>
          {url && (
            <span className="text-muted-foreground"> — {url}</span>
          )}
        </div>
        {startDate && (
          <DateRange start={startDate} end={endDate} current={current} />
        )}
      </div>
      {description && (
        <p className="text-[9.5px] text-foreground/85 mt-[1px]">
          {description}
        </p>
      )}
      {technologies && technologies.filter(Boolean).length > 0 && (
        <p className="text-[8.5px] text-muted-foreground mt-[1px]">
          {technologies.filter(Boolean).join("  ·  ")}
        </p>
      )}
    </div>
  );
}

// ============================================================
// CERTIFICATION CARD
// ============================================================

interface CertificationCardProps {
  name: string;
  issuer?: string;
  date?: MonthYear;
  className?: string;
}

export function CertificationCard({
  name,
  issuer,
  date,
  className = "",
}: CertificationCardProps) {
  return (
    <div className={`text-[9.5px] ${className}`}>
      <span className="font-medium">{name || "Certification"}</span>
      {issuer && <span className="text-muted-foreground"> — {issuer}</span>}
      {date && (
        <span className="text-[8.5px] text-muted-foreground">
          {" "}({date.month}/{date.year})
        </span>
      )}
    </div>
  );
}

// ============================================================
// LANGUAGE DISPLAY
// ============================================================

interface LanguageDisplayProps {
  items: Array<{ id: string; name: string; proficiency: string }>;
  variant?: "inline" | "list";
  className?: string;
}

export function LanguageDisplay({
  items,
  variant = "inline",
  className = "",
}: LanguageDisplayProps) {
  if (!items || items.length === 0) return null;

  if (variant === "list") {
    return (
      <div className={`flex flex-col gap-0.5 ${className}`}>
        {items.map((l) => (
          <div key={l.id} className="flex justify-between text-[9.5px]">
            <span>{l.name}</span>
            <span className="text-muted-foreground ml-2">{l.proficiency}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-0.5 ${className}`}>
      {items.map((l) => (
        <span key={l.id} className="text-[9.5px]">
          {l.name}{" "}
          <span className="text-muted-foreground">({l.proficiency})</span>
        </span>
      ))}
    </div>
  );
}

// ============================================================
// SECTION ORDER RENDERER — renders sections in the order specified
// ============================================================

interface SectionRendererProps {
  resume: import("@/lib/schema").Resume;
  sections: Record<string, boolean>;
  renderSection: (sectionKey: string) => ReactNode | null;
  className?: string;
}

export function SectionRenderer({
  resume,
  sections,
  renderSection,
  className = "",
}: SectionRendererProps) {
  const order = resume.meta.sectionOrder;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {order.map((key) => {
        // Check if section is visible
        if (sections[key] === false) return null;
        return <div key={key}>{renderSection(key)}</div>;
      })}
    </div>
  );
}
