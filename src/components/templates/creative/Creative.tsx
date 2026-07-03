import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface CreativeProps {
  resume: Resume;
}

export function Creative({ resume }: CreativeProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed">
      {/* Colorful Header */}
      <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 p-6 text-white">
        <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
        {personalInfo.title && <p className="text-sm mt-1 opacity-90">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] opacity-80">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin].filter(Boolean).join("  ·  ")}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Summary */}
        {summary && (
          <div className="rounded-lg border-l-4 border-purple-400 pl-3">
            <p className="text-justify leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.1em] text-purple-600 mb-2">Experience</h3>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.id} className="rounded-lg border border-border p-3 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-[11px]">{exp.position}</span>
                      {exp.company && <span className="text-muted-foreground"> at {exp.company}</span>}
                    </div>
                    <span className="shrink-0 text-[9px] text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  </div>
                  {exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 list-disc pl-4 text-[10px] leading-relaxed">
                      {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Skills */}
        <div className="flex gap-6">
          {education.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.1em] text-rose-500 mb-2">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="font-semibold">{edu.school}</div>
                  <div className="text-muted-foreground">{edu.degree} in {edu.field}</div>
                  <div className="text-[9px] text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.1em] text-indigo-500 mb-2">Skills</h3>
              {skills.map((s) => (
                <div key={s.id} className="mb-1.5">
                  <div className="text-[10px] font-medium mb-0.5">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="rounded-full bg-gradient-to-r from-rose-100 to-purple-100 dark:from-rose-900/30 dark:to-purple-900/30 px-2 py-0.5 text-[8px] font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects & Certifications */}
        {projects.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.1em] text-rose-500 mb-2">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <span className="font-semibold">{p.name}</span>
                {p.description && <p className="text-[10px]">{p.description}</p>}
                {p.technologies.filter(Boolean).length > 0 && <p className="text-[9px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.1em] text-indigo-500 mb-1">Languages</h3>
            <div className="flex flex-wrap gap-x-4 text-[10px]">
              {languages.map((l) => <span key={l.id}>{l.name} <span className="text-muted-foreground">({l.proficiency})</span></span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
