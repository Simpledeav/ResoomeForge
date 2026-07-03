import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface BoldProps {
  resume: Resume;
}

export function Bold({ resume }: BoldProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans leading-relaxed">
      {/* Bold Header */}
      <div className="bg-foreground text-background p-6">
        <h1 className="text-3xl font-black tracking-tight uppercase">{fullName}</h1>
        {personalInfo.title && <p className="text-xs mt-1 font-medium opacity-80 uppercase tracking-wider">{personalInfo.title}</p>}
        <div className="flex flex-wrap gap-3 mt-3 text-[9px] opacity-70">
          {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join("  |  ")}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex gap-6">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-4">
            {summary && (
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground mb-1.5">Summary</h3>
                <p className="text-[10px] leading-relaxed">{summary}</p>
              </div>
            )}

            {experience.length > 0 && (
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground mb-2">Experience</h3>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-[11px]">{exp.position}</span>
                      <span className="shrink-0 text-[8px] font-medium text-muted-foreground">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                    </div>
                    {exp.company && <div className="text-[9px] font-medium text-muted-foreground">{exp.company}</div>}
                    {exp.bullets.filter(Boolean).length > 0 && (
                      <ul className="mt-1 list-disc pl-4 text-[9.5px] leading-relaxed">
                        {exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground mb-1.5">Education</h3>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-1">
                    <div className="font-bold">{edu.school}</div>
                    <div className="text-[9px] text-muted-foreground">{edu.degree} in {edu.field} · {formatDateRange(edu.startDate, edu.endDate, edu.current)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="w-[180px] shrink-0 flex flex-col gap-4">
            {skills.length > 0 && (
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground mb-2">Skills</h3>
                {skills.map((s) => (
                  <div key={s.id} className="mb-2">
                    <div className="text-[9px] font-bold mb-0.5">{s.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.skills.filter(Boolean).map((skill, i) => (
                        <span key={i} className="bg-foreground text-background px-1.5 py-0.5 text-[8px] font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground mb-1.5">Certifications</h3>
                {certifications.map((c) => <div key={c.id} className="text-[9px] mb-1"><span className="font-bold">{c.name}</span>{c.issuer && <span className="text-muted-foreground"> — {c.issuer}</span>}</div>)}
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground mb-1.5">Projects</h3>
                {projects.map((p) => (
                  <div key={p.id} className="mb-2">
                    <div className="font-bold text-[9px]">{p.name}</div>
                    {p.description && <div className="text-[8.5px]">{p.description}</div>}
                  </div>
                ))}
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-foreground mb-1">Languages</h3>
                {languages.map((l) => <div key={l.id} className="text-[9px] mb-0.5">{l.name} <span className="text-muted-foreground">({l.proficiency})</span></div>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
