import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface SplitProps {
  resume: Resume;
}

export function Split({ resume }: SplitProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex font-sans text-[10px] leading-relaxed min-h-full">
      {/* Left Column */}
      <div className="w-1/2 border-r border-border p-5 flex flex-col gap-4">
        <div className="border-b border-border pb-3">
          <h1 className="text-lg font-bold tracking-tight">{fullName}</h1>
          {personalInfo.title && <p className="text-[11px] text-muted-foreground mt-0.5">{personalInfo.title}</p>}
          <div className="flex flex-col gap-0.5 mt-2 text-[9px] text-muted-foreground">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">About</h3>
            <p className="text-[9.5px] leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="font-semibold text-[10px]">{edu.school}</div>
                <div className="text-[9px] text-muted-foreground">{edu.degree} in {edu.field}</div>
                <div className="text-[8px] text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate, edu.current)}{edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">Skills</h3>
            {skills.map((s) => (
              <div key={s.id} className="mb-1.5">
                <div className="text-[9px] font-medium mb-0.5">{s.category}</div>
                <div className="flex flex-wrap gap-1">
                  {s.skills.filter(Boolean).map((skill, i) => (
                    <span key={i} className="rounded-sm bg-muted px-1.5 py-0.5 text-[8px] text-foreground/80">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">Languages</h3>
            {languages.map((l) => (
              <div key={l.id} className="flex justify-between text-[9px] mb-0.5">
                <span>{l.name}</span>
                <span className="text-muted-foreground">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">Certifications</h3>
            {certifications.map((c) => (
              <div key={c.id} className="mb-1 text-[9px]">
                <div className="font-medium">{c.name}</div>
                {c.issuer && <div className="text-muted-foreground">{c.issuer}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-1/2 p-5 flex flex-col gap-4">
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2">Experience</h3>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-[10px]">{exp.position}</span>
                    <span className="shrink-0 text-[8px] text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  </div>
                  {exp.company && <div className="text-[9px] text-muted-foreground">{exp.company}</div>}
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc pl-3.5 text-[9px] leading-relaxed">
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <div className="flex items-start justify-between">
                  <span className="font-medium text-[10px]">{p.name}</span>
                  {p.startDate && <span className="text-[8px] text-muted-foreground">{formatDateRange(p.startDate, p.endDate, p.current)}</span>}
                </div>
                {p.description && <p className="text-[9px]">{p.description}</p>}
                {p.technologies.filter(Boolean).length > 0 && <p className="text-[8px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
