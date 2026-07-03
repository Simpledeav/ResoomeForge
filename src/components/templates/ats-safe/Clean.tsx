import type { Resume } from "@/lib/schema";
import { Section, Divider } from "@/components/templates/shared/Section";
import { formatDateRange } from "@/components/templates/shared/types";

interface CleanProps {
  resume: Resume;
}

export function Clean({ resume }: CleanProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-4 p-10 font-sans text-[10.5px] leading-relaxed">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-border pb-3">
        <div>
          <h1 className="text-2xl font-light tracking-tight">{fullName}</h1>
          {personalInfo.title && (
            <p className="text-xs text-muted-foreground mt-0.5">{personalInfo.title}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-0.5 text-[9px] text-muted-foreground">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="About" titleSize="text-[9px]">
          <p className="text-justify leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience" titleSize="text-[9px]">
          <div className="flex flex-col gap-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-semibold">{exp.position}</span>
                    {exp.company && <span className="text-muted-foreground"> — {exp.company}</span>}
                  </div>
                  <span className="shrink-0 text-[9px] text-muted-foreground">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-[10px] leading-relaxed">
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
        <Section title="Education" titleSize="text-[9px]">
          {education.map((edu) => (
            <div key={edu.id} className="flex items-start justify-between">
              <div>
                <span className="font-semibold">{edu.school}</span>
                <p className="text-muted-foreground">{edu.degree} in {edu.field}</p>
              </div>
              <span className="shrink-0 text-[9px] text-muted-foreground">
                {formatDateRange(edu.startDate, edu.endDate, edu.current)}
              </span>
            </div>
          ))}
        </Section>
      )}

      {/* Skills + Certifications inline */}
      <div className="flex gap-8">
        {skills.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Skills</h3>
            <div className="flex flex-col gap-1.5">
              {skills.map((s) => (
                <div key={s.id} className="text-[10px]">
                  <span className="font-medium">{s.category}: </span>
                  <span className="text-muted-foreground">{s.skills.filter(Boolean).join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="flex-1">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Certifications</h3>
            {certifications.map((c) => (
              <div key={c.id} className="text-[10px] mb-1">
                <div className="font-medium">{c.name}</div>
                {c.issuer && <div className="text-muted-foreground">{c.issuer}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects" titleSize="text-[9px]">
          {projects.map((p) => (
            <div key={p.id} className="mb-2">
              <div className="flex items-start justify-between">
                <span className="font-medium">{p.name}</span>
                {p.startDate && <span className="text-[9px] text-muted-foreground">{formatDateRange(p.startDate, p.endDate, p.current)}</span>}
              </div>
              {p.description && <p className="text-[10px]">{p.description}</p>}
              {p.technologies.filter(Boolean).length > 0 && (
                <p className="text-[9px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="Languages" titleSize="text-[9px]">
          <div className="flex flex-wrap gap-x-4 text-[10px]">
            {languages.map((l) => <span key={l.id}>{l.name} ({l.proficiency})</span>)}
          </div>
        </Section>
      )}
    </div>
  );
}
