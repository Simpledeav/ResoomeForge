"use client";

import { PersonalInfoForm } from "./sections/PersonalInfoForm";
import { SummaryForm } from "./sections/SummaryForm";
import { ExperienceForm } from "./sections/ExperienceForm";
import { EducationForm } from "./sections/EducationForm";
import { SkillsForm } from "./sections/SkillsForm";
import { ProjectsForm } from "./sections/ProjectsForm";
import { CertificationsForm } from "./sections/CertificationsForm";
import { LanguagesForm } from "./sections/LanguagesForm";
import { useResumeStore } from "@/lib/store";
import { Eye, EyeOff, Sparkles } from "lucide-react";

interface FormPanelProps {
  activeSection: string;
}

const SECTION_TITLES: Record<string, { title: string; description: string }> = {
  personalInfo: { title: "Personal Info", description: "Your name, contact details, and professional headline." },
  summary: { title: "Professional Summary", description: "A brief overview of your qualifications and career goals." },
  experience: { title: "Experience", description: "Your work history, roles, and accomplishments." },
  education: { title: "Education", description: "Your academic background and qualifications." },
  skills: { title: "Skills", description: "Technical and professional skills organized by category." },
  certifications: { title: "Certifications", description: "Professional certifications and licenses." },
  projects: { title: "Projects", description: "Notable projects with descriptions and technologies used." },
  languages: { title: "Languages", description: "Languages you speak and your proficiency level." },
};

export function FormPanel({ activeSection }: FormPanelProps) {
  const sectionVisibility = useResumeStore((s) => s.sectionVisibility);
  const setSectionVisibility = useResumeStore((s) => s.setSectionVisibility);

  const sectionInfo = SECTION_TITLES[activeSection] || {
    title: activeSection,
    description: "",
  };
  const isVisible = sectionVisibility[activeSection] !== false;

  const renderForm = () => {
    switch (activeSection) {
      case "personalInfo":
        return <PersonalInfoForm />;
      case "summary":
        return <SummaryForm />;
      case "experience":
        return <ExperienceForm />;
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "languages":
        return <LanguagesForm />;
      default:
        return (
          <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
            Select a section to edit
          </div>
        );
    }
  };

  return (
    <div className="w-full lg:w-[420px] shrink-0 lg:border-r border-border flex flex-col overflow-hidden">
      {/* Section header */}
      <div className="flex items-start justify-between border-b border-border px-4 py-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h2 className="text-sm font-semibold text-foreground">{sectionInfo.title}</h2>
          <p className="text-[11px] text-muted-foreground line-clamp-1">{sectionInfo.description}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-3">
          {/* AI Assistant Coming Soon badge */}
          <div className="hidden sm:flex items-center gap-1 text-[9px] text-muted-foreground border border-border rounded-md px-1.5 py-0.5 mr-1">
            <Sparkles className="size-2.5" />
            <span>AI</span>
          </div>
          <button
            onClick={() => setSectionVisibility(activeSection, !isVisible)}
            className={`p-1 rounded-md transition-colors ${
              isVisible
                ? "text-muted-foreground hover:text-foreground"
                : "text-destructive hover:text-destructive/80"
            }`}
            title={isVisible ? "Hide from resume" : "Show in resume"}
          >
            {isVisible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {renderForm()}
      </div>
    </div>
  );
}
