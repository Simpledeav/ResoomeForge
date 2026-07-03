import type { Resume } from "@/lib/schema";
import { Section } from "@/components/templates/shared/Section";
import { formatDateRange } from "@/components/templates/shared/types";

interface MinimalProps {
  resume: Resume;
}

export function Minimal({ resume }: MinimalProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-6 p-10 font-sans text-[10.5px] leading-relaxed max-w-[700px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1 pb-4 border-b-2 border-foreground">
        <h1 className="text-[26px] font-bold tracking-tight leading-none">{fullName}</h1>
        {personalInfo.title && <p className="text-sm text-muted-foreground font-medium">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[9px] text-muted-foreground">
          {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join("  ·  ")}
          {personalInfo.website && <span>· {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>· {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && <p className="text-[10.5px] leading-relaxed text-justify">{summary}</p>}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience" titleSize="text-[9px]" titleColor="text-muted-foreground">
          <div className="flex flex-col gap-3.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-semibold">{exp.position}</span>
                    {exp.company && <span className="text-muted-foreground">, {exp.company}</span>}
                  </div>
                  <span className="shrink-0 text-[9px] text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                {exp.location && <p className="text-[9px] text-muted-foreground">{exp.location}</p>}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-[10px] leading-relaxed space-y-0.5">
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" titleSize="text-[9px]" titleColor="text-muted-foreground">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-medium">{edu.school}</span>
                <p className="text-muted-foreground">{edu.degree} in {edu.field}{edu.gpa ? ` — GPA: ${edu.gpa}` : ""}</p>
              </div>
              <span className="shrink-0 text-[9px] text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills" titleSize="text-[9px]" titleColor="text-muted-foreground">
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            {skills.map((s) => (
              <div key={s.id} className="text-[10px]">
                <span className="font-medium">{s.category}: </span>
                <span className="text-muted-foreground">{s.skills.filter(Boolean).join(", ")}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects" titleSize="text-[9px]" titleColor="text-muted-foreground">
          {projects.map((p) => (
            <div key={p.id} className="mb-2 last:mb-0">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-medium">{p.name}</span>
                {p.startDate && <span className="text-[9px] text-muted-foreground">{formatDateRange(p.startDate, p.endDate, p.current)}</span>}
              </div>
              {p.description && <p className="text-[10px]">{p.description}</p>}
              {p.technologies.filter(Boolean).length > 0 && <p className="text-[9px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications + Languages inline */}
      <div className="flex gap-8">
        {certifications.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Certifications</h3>
            {certifications.map((c) => <div key={c.id} className="text-[10px] mb-1"><span className="font-medium">{c.name}</span>{c.issuer && <span className="text-muted-foreground"> — {c.issuer}</span>}</div>)}
          </div>
        )}
        {languages.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Languages</h3>
            <div className="flex flex-wrap gap-x-3 text-[10px]">
              {languages.map((l) => <span key={l.id}>{l.name} ({l.proficiency})</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
