import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  LanguageDisplay,
  CertificationCard,
} from "@/components/templates/shared/TemplateBase";

export function Bold({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans leading-relaxed" style={wrapperStyle}>
      {/* Bold Header — high-contrast inverted */}
      <div className="bg-foreground text-background p-6">
        <h1 className="text-3xl font-black tracking-tight uppercase">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-xs mt-1 font-medium opacity-80 uppercase tracking-wider">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-3 mt-3 text-[9px] opacity-70">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .join("  |  ")}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex gap-6">
          {/* Left — main content */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Summary */}
            {summary && (
              <SectionBlock>
                <Heading size="sm">Summary</Heading>
                <p className="text-[10px] leading-relaxed text-foreground/90">{summary}</p>
              </SectionBlock>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <SectionBlock>
                <Heading size="sm">Experience</Heading>
                <div className="flex flex-col gap-3">
                  {experience.map((exp) => (
                    <div key={exp.id} className="mb-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[11px] text-foreground">{exp.position}</span>
                        <span className="shrink-0 text-[8px] font-medium text-muted-foreground">
                          {exp.startDate.month}/{exp.startDate.year}
                          {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                        </span>
                      </div>
                      {exp.company && (
                        <div className="text-[9px] font-medium text-muted-foreground">{exp.company}</div>
                      )}
                      <BulletList items={exp.bullets} className="mt-1 text-[9.5px]" />
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}

            {/* Education */}
            {education.length > 0 && (
              <SectionBlock>
                <Heading size="sm">Education</Heading>
                <div className="flex flex-col gap-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-1">
                      <div className="font-bold text-[10px] text-foreground">{edu.school}</div>
                      <div className="text-[9px] text-muted-foreground">
                        {edu.degree} in {edu.field}
                        {" · "}
                        {edu.startDate.month}/{edu.startDate.year}
                        {edu.current ? " – Present" : edu.endDate ? ` – ${edu.endDate.month}/${edu.endDate.year}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="w-[180px] shrink-0 flex flex-col gap-4">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <Heading size="sm">Skills</Heading>
                <div className="flex flex-col gap-2 mt-1.5">
                  {skills.map((s) => (
                    <div key={s.id}>
                      <div className="text-[9px] font-bold mb-1">{s.category}</div>
                      <div className="flex flex-wrap gap-1">
                        {s.skills.filter(Boolean).map((skill, i) => (
                          <span
                            key={i}
                            className="inline-block bg-foreground text-background px-1.5 py-[1px] text-[8px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <Heading size="sm">Certifications</Heading>
                <div className="flex flex-col gap-1 mt-1">
                  {certifications.map((c) => (
                    <CertificationCard key={c.id} name={c.name} issuer={c.issuer} />
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <Heading size="sm">Projects</Heading>
                <div className="flex flex-col gap-1 mt-1">
                  {projects.map((p) => (
                    <div key={p.id} className="mb-1">
                      <div className="font-bold text-[9px]">{p.name}</div>
                      {p.description && (
                        <div className="text-[8.5px] text-foreground/85">{p.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <Heading size="sm">Languages</Heading>
                <LanguageDisplay items={languages} variant="list" className="mt-1" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
