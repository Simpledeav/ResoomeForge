"use client";

import { useResumeStore } from "@/lib/store";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  FolderKanban,
  Languages,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SECTION_ICONS: Record<string, React.ReactNode> = {
  personalInfo: <User className="size-4" />,
  summary: <FileText className="size-4" />,
  experience: <Briefcase className="size-4" />,
  education: <GraduationCap className="size-4" />,
  skills: <Wrench className="size-4" />,
  certifications: <Award className="size-4" />,
  projects: <FolderKanban className="size-4" />,
  languages: <Languages className="size-4" />,
};

const SECTION_LABELS: Record<string, string> = {
  personalInfo: "Info",
  summary: "Summary",
  experience: "Work",
  education: "Education",
  skills: "Skills",
  certifications: "Certs",
  projects: "Projects",
  languages: "Languages",
};

interface SectionNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SectionNav({ activeSection, onSectionChange }: SectionNavProps) {
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);
  const setSectionVisibility = useResumeStore((s) => s.setSectionVisibility);
  const sectionOrder = useResumeStore((s) => s.currentResume.meta.sectionOrder);

  return (
    <div className="w-[72px] shrink-0 border-r border-border bg-muted/20 flex flex-col items-center py-3 gap-1 overflow-y-auto">
      {sectionOrder.map((key) => {
        const isVisible = sectionVisibility[key] !== false;
        const isActive = activeSection === key;
        const icon = SECTION_ICONS[key];

        if (!icon) return null;

        return (
          <div key={key} className="relative group">
            <button
              onClick={() => onSectionChange(key)}
              className={cn(
                "flex items-center justify-center w-12 h-10 rounded-lg transition-all relative",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              title={SECTION_LABELS[key] || key}
            >
              {icon}
              {!isVisible && (
                <span className="absolute -top-0.5 -right-0.5">
                  <EyeOff className="size-2.5 text-muted-foreground" />
                </span>
              )}
            </button>
            {/* Tooltip */}
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-foreground text-background text-[10px] whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
              {SECTION_LABELS[key] || key}
              {!isVisible && " (hidden)"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
