import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface ApexProps {
  resume: Resume;
}

export function Apex({ resume }: ApexProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed min-h-full">
      {/* Header Bar */}
      <div className="bg-foreground text-background p-6 pb-5">
        <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
        {personalInfo.title && <p className="text-sm mt-1 opacity-80">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] opacity-70">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-[180px] shrink-0 bg-muted p-4 flex flex-col gap-4">
          {skills.length > 0 && (
            <div>
              <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2">Skills</h3>
              {skills.map((s) => (
                <div key={s.id} className="mb-2">
                  <div className="text-[9px] font-medium mb-0.5">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="rounded-sm bg-background/80 px-1.5 py-0.5 text-[8px] text-foreground/70 border border-border/50">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

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

          {personalInfo.linkedin && <div className="text-[8px] text-muted-foreground break-all">{personalInfo.linkedin}</div>}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          {summary && (
            <div>
              <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1">Summary</h3>
              <p className="text-[10px] leading-relaxed text-justify">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-2">Experience</h3>
              <div className="flex flex-col gap-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-[11px]">{exp.position}</span>
                      <span className="shrink-0 text-[8px] text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                    </div>
                    {exp.company && <div className="text-[9px] text-muted-foreground">{exp.company} · {exp.location}</div>}
                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul className="mt-1 list-disc pl-4 text-[9.5px] leading-relaxed">
                        {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1">
                  <span className="font-medium text-[10px]">{edu.school}</span>
                  <p className="text-[9px] text-muted-foreground">{edu.degree} in {edu.field} · {formatDateRange(edu.startDate, edu.endDate, edu.current)}</p>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">Projects</h3>
              {projects.map((p) => (
                <div key={p.id} className="mb-2">
                  <span className="font-medium text-[10px]">{p.name}</span>
                  {p.description && <p className="text-[9px]">{p.description}</p>}
                  {p.technologies.filter(Boolean).length > 0 && <p className="text-[8px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
