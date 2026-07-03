import type { Resume } from "@/lib/schema";
import { Section } from "@/components/templates/shared/Section";
import { formatDateRange } from "@/components/templates/shared/types";

interface ElementProps {
  resume: Resume;
}

export function Element({ resume }: ElementProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed">
      {/* Elegant header with accent underline */}
      <div className="p-6 pb-4 relative">
        <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-foreground to-transparent" />
        <h1 className="text-2xl font-light tracking-tight">{fullName}</h1>
        {personalInfo.title && <p className="text-xs text-muted-foreground mt-0.5 font-light">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-muted-foreground">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin].filter(Boolean).map((item, i, arr) => (
            <span key={i} className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30 inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-5">
        {/* Summary */}
        {summary && (
          <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
            <p className="text-[10px] leading-relaxed italic text-muted-foreground">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Experience</h3>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_auto] gap-x-4">
                  <div>
                    <span className="font-semibold text-[11px]">{exp.position}</span>
                    {exp.company && <span className="text-muted-foreground"> — {exp.company}</span>}
                  </div>
                  <span className="text-[8px] text-muted-foreground text-right">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="col-span-2 mt-1 list-disc pl-4 text-[9.5px] leading-relaxed text-foreground/85">
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education + Skills */}
        <div className="flex gap-8">
          {education.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="font-medium text-[10px]">{edu.school}</div>
                  <div className="text-[9px] text-muted-foreground">{edu.degree} in {edu.field}</div>
                  <div className="text-[8px] text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate, edu.current)}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Skills</h3>
              {skills.map((s) => (
                <div key={s.id} className="mb-1.5">
                  <div className="text-[9px] font-medium mb-0.5">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="rounded-md border border-border bg-background px-1.5 py-0.5 text-[8px]">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h3 className="text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-2 flex gap-4">
                <div className="flex-1">
                  <span className="font-medium text-[10px]">{p.name}</span>
                  {p.description && <p className="text-[9px] text-muted-foreground">{p.description}</p>}
                </div>
                {p.technologies.filter(Boolean).length > 0 && (
                  <div className="text-right shrink-0">
                    {p.technologies.filter(Boolean).map((t, i) => (
                      <span key={i} className="text-[8px] text-muted-foreground block">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications + Languages inline */}
        <div className="flex gap-8">
          {certifications.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">Certifications</h3>
              {certifications.map((c) => <div key={c.id} className="text-[9px] mb-0.5"><span className="font-medium">{c.name}</span>{c.issuer && <span className="text-muted-foreground"> · {c.issuer}</span>}</div>)}
            </div>
          )}
          {languages.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">Languages</h3>
              <div className="flex flex-wrap gap-x-4 text-[9px]">
                {languages.map((l) => <span key={l.id}>{l.name} <span className="text-muted-foreground">({l.proficiency})</span></span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
