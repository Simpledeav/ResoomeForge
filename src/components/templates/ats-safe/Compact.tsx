import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface CompactProps {
  resume: Resume;
}

export function Compact({ resume }: CompactProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-3 p-6 font-sans text-[10px] leading-snug">
      {/* Header */}
      <div className="text-center border-b border-border pb-2">
        <h1 className="text-base font-bold tracking-tight">{fullName}</h1>
        {personalInfo.title && <p className="text-[11px] text-muted-foreground font-medium">{personalInfo.title}</p>}
        <div className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-[9px] text-muted-foreground">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin].filter(Boolean).map((item, i) => (
            <span key={i}>
              {item}
              {i < [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin].filter(Boolean).length - 1 && <span className="ml-2">|</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      {summary && <p className="text-[10px] text-justify leading-relaxed">{summary}</p>}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground border-b border-border pb-0.5 mb-1.5">Experience</h3>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex items-start justify-between">
                <div className="font-semibold text-[10.5px]">
                  {exp.position}{exp.company ? <span className="font-normal text-muted-foreground"> | {exp.company}</span> : ""}
                </div>
                <span className="shrink-0 text-[8px] text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
              </div>
              {exp.bullets.filter(Boolean).length > 0 && (
                <ul className="mt-0.5 list-disc pl-3.5 text-[9.5px] leading-relaxed">
                  {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education + Skills inline */}
      <div className="flex gap-4">
        {education.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground border-b border-border pb-0.5 mb-1.5">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-1">
                <div className="font-medium">{edu.school}</div>
                <div className="text-[9px] text-muted-foreground">{edu.degree} in {edu.field}</div>
                <div className="text-[8px] text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate, edu.current)}{edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground border-b border-border pb-0.5 mb-1.5">Skills</h3>
            {skills.map((s) => (
              <div key={s.id} className="mb-1">
                <span className="font-medium text-[9px]">{s.category}: </span>
                <span className="text-[9px] text-foreground/80">{s.skills.filter(Boolean).join(", ")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects + Certifications inline */}
      <div className="flex gap-4">
        {projects.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground border-b border-border pb-0.5 mb-1.5">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-1">
                <div className="font-medium text-[9.5px]">{p.name}</div>
                {p.description && <div className="text-[9px]">{p.description}</div>}
                {p.technologies.filter(Boolean).length > 0 && <div className="text-[8px] text-muted-foreground">{p.technologies.filter(Boolean).join(", ")}</div>}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground border-b border-border pb-0.5 mb-1.5">Certifications</h3>
            {certifications.map((c) => (
              <div key={c.id} className="mb-1 text-[9px]">
                <div className="font-medium">{c.name}</div>
                {c.issuer && <div className="text-muted-foreground">{c.issuer}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground border-b border-border pb-0.5 mb-1">Languages</h3>
          <div className="flex flex-wrap gap-x-3 text-[9px]">
            {languages.map((l) => (
              <span key={l.id}>{l.name} ({l.proficiency})</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
