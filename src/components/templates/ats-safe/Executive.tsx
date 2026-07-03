import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface ExecutiveProps {
  resume: Resume;
}

export function Executive({ resume }: ExecutiveProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  const contactItems = [
    personalInfo.email && { label: "Email", value: personalInfo.email },
    personalInfo.phone && { label: "Phone", value: personalInfo.phone },
    personalInfo.location && { label: "Location", value: personalInfo.location },
    personalInfo.website && { label: "Website", value: personalInfo.website },
    personalInfo.linkedin && { label: "LinkedIn", value: personalInfo.linkedin },
  ].filter(Boolean);

  return (
    <div className="flex min-h-full font-sans text-[11px] leading-relaxed">
      {/* Sidebar */}
      <div className="w-[160px] shrink-0 bg-muted p-5 flex flex-col gap-5">
        {/* Name & Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-bold tracking-tight leading-tight">{fullName}</h1>
          {personalInfo.title && (
            <p className="text-[10px] font-medium text-muted-foreground">{personalInfo.title}</p>
          )}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Contact</h3>
          <div className="flex flex-col gap-1">
            {contactItems.map((item: any, i: number) => (
              <div key={i} className="text-[10px] text-foreground/80">
                {item.value}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Skills</h3>
            <div className="flex flex-col gap-2">
              {skills.map((s) => (
                <div key={s.id} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium">{s.category}</span>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="rounded-sm bg-background/80 px-1.5 py-0.5 text-[9px] text-foreground/80 border border-border/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Languages</h3>
            {languages.map((l) => (
              <div key={l.id} className="flex justify-between text-[10px]">
                <span>{l.name}</span>
                <span className="text-muted-foreground">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Certifications</h3>
            {certifications.map((c) => (
              <div key={c.id} className="text-[10px]">
                <div className="font-medium">{c.name}</div>
                {c.issuer && <div className="text-muted-foreground">{c.issuer}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Summary */}
        {summary && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Summary</h3>
            <p className="text-justify text-[10.5px] leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Experience</h3>
            <div className="flex flex-col gap-2.5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold text-[11px]">{exp.position}</span>
                      {exp.company && <span className="text-muted-foreground"> — {exp.company}</span>}
                    </div>
                    <span className="shrink-0 text-[9px] text-muted-foreground">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.location && <p className="text-[9px] text-muted-foreground">{exp.location}</p>}
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc pl-4 text-[10px] leading-relaxed">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Education</h3>
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-[11px]">{edu.school}</span>
                  <span className="text-[9px] text-muted-foreground">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {edu.degree} in {edu.field}{edu.gpa ? ` — GPA: ${edu.gpa}` : ""}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-[10.5px]">{p.name}</span>
                  {p.startDate && (
                    <span className="text-[9px] text-muted-foreground">
                      {formatDateRange(p.startDate, p.endDate, p.current)}
                    </span>
                  )}
                </div>
                {p.description && <p className="text-[10px]">{p.description}</p>}
                {p.technologies.filter(Boolean).length > 0 && (
                  <p className="text-[9px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
