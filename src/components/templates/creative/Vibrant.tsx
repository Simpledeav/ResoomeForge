import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface VibrantProps {
  resume: Resume;
}

export function Vibrant({ resume }: VibrantProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed">
      {/* Vibrant header with stripes */}
      <div className="bg-foreground text-background p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-emerald-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400" />
        <h1 className="text-xl font-extrabold tracking-tight">{fullName}</h1>
        {personalInfo.title && <p className="text-xs mt-0.5 font-medium text-emerald-300">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-[9px] opacity-75">
          {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join("  ·  ")}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Summary */}
        {summary && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-3 border border-emerald-200/50 dark:border-emerald-800/30">
            <p className="text-[10px] leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h3 className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400 mb-2">Experience</h3>
            {experience.map((exp, idx) => (
              <div key={exp.id} className="mb-3 relative pl-4 border-l-2 border-emerald-200 dark:border-emerald-800 ml-1">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-400" />
                <div className="flex items-start justify-between">
                  <span className="font-bold text-[11px]">{exp.position}</span>
                  <span className="shrink-0 text-[8px] text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                </div>
                {exp.company && <div className="text-[9px] font-medium text-emerald-600/70 dark:text-emerald-400/70">{exp.company}</div>}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-[9.5px] leading-relaxed">
                    {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education + Skills inline */}
        <div className="flex gap-6">
          {education.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-cyan-600 dark:text-cyan-400 mb-1.5">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="font-bold text-[10px]">{edu.school}</div>
                  <div className="text-[9px] text-muted-foreground">{edu.degree} in {edu.field}</div>
                  <div className="text-[8px] text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div className="flex-1">
              <h3 className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-violet-600 dark:text-violet-400 mb-1.5">Skills</h3>
              {skills.map((s) => (
                <div key={s.id} className="mb-2">
                  <div className="text-[9px] font-bold mb-0.5">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="rounded-full bg-gradient-to-r from-emerald-100 via-cyan-100 to-violet-100 dark:from-emerald-900/30 dark:via-cyan-900/30 dark:to-violet-900/30 px-2 py-0.5 text-[8px] font-medium">{skill}</span>
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
            <h3 className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-cyan-600 dark:text-cyan-400 mb-1.5">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <span className="font-bold text-[10px]">{p.name}</span>
                {p.description && <p className="text-[9.5px]">{p.description}</p>}
                {p.technologies.filter(Boolean).length > 0 && <p className="text-[8px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications + Languages */}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-violet-600 dark:text-violet-400 mb-1">Certifications</h3>
            {certifications.map((c) => <div key={c.id} className="text-[9px] mb-0.5"><span className="font-medium">{c.name}</span>{c.issuer && <span className="text-muted-foreground"> · {c.issuer}</span>}</div>)}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h3 className="text-[8px] font-extrabold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400 mb-1">Languages</h3>
            <div className="flex flex-wrap gap-x-3 text-[9px]">
              {languages.map((l) => <span key={l.id}>{l.name} <span className="text-muted-foreground">({l.proficiency})</span></span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
