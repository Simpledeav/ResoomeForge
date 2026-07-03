import type { Resume } from "@/lib/schema";
import { formatDateRange } from "@/components/templates/shared/types";

interface SidebarProps {
  resume: Resume;
  accentColor?: string;
}

export function Sidebar({ resume, accentColor = "#0070f3" }: SidebarProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex min-h-full font-sans text-[10.5px] leading-relaxed">
      {/* Sidebar with accent color */}
      <div className="w-[180px] shrink-0 p-5 flex flex-col gap-5" style={{ backgroundColor: accentColor, color: "#fff" }}>
        <div>
          <h1 className="text-sm font-bold leading-tight">{fullName}</h1>
          {personalInfo.title && <p className="text-[10px] mt-1 opacity-80">{personalInfo.title}</p>}
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] mb-2 opacity-70">Contact</h3>
          <div className="flex flex-col gap-1 text-[10px] opacity-90">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] mb-2 opacity-70">Skills</h3>
            <div className="flex flex-col gap-2">
              {skills.map((s) => (
                <div key={s.id}>
                  <div className="text-[10px] font-medium mb-0.5">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="rounded-sm bg-white/15 px-1.5 py-0.5 text-[9px]">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.1em] mb-2 opacity-70">Languages</h3>
            {languages.map((l) => (
              <div key={l.id} className="flex justify-between text-[10px] mb-1">
                <span>{l.name}</span>
                <span className="opacity-70">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        {summary && <p className="text-justify text-[10.5px] leading-relaxed">{summary}</p>}

        {experience.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Experience</h3>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold text-[11px]">{exp.position}</span>
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

        {education.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between mb-1">
                <div>
                  <span className="font-medium">{edu.school}</span>
                  <p className="text-muted-foreground">{edu.degree} in {edu.field}</p>
                </div>
                <span className="shrink-0 text-[9px] text-muted-foreground">{formatDateRange(edu.startDate, edu.endDate, edu.current)}</span>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Certifications</h3>
            {certifications.map((c) => (
              <div key={c.id} className="text-[10px] mb-1">
                <span className="font-medium">{c.name}</span>
                {c.issuer && <span className="text-muted-foreground"> — {c.issuer}</span>}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="mb-2">
                <span className="font-medium">{p.name}</span>
                {p.description && <p className="text-[10px]">{p.description}</p>}
                {p.technologies.filter(Boolean).length > 0 && <p className="text-[9px] text-muted-foreground">{p.technologies.filter(Boolean).join(" · ")}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
