import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  SkillsDisplay,
  LanguageDisplay,
  EducationCard,
  CertificationCard,
} from "@/components/templates/shared/TemplateBase";

export function Element({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed" style={wrapperStyle}>
      {/* Elegant header with accent underline */}
      <div className="p-6 pb-4 relative">
        <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-foreground to-transparent" />
        <h1 className="text-2xl font-light tracking-tight text-foreground">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-xs text-muted-foreground mt-0.5 font-light">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-2 text-[9px] text-muted-foreground">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30 inline-block" />
                {item}
              </span>
            ))}
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-5">
        {/* Summary — subtle callout */}
        {summary && (
          <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
            <p className="text-[10px] leading-relaxed italic text-muted-foreground">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Experience</Heading>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-[1fr_auto] gap-x-4">
                  <div>
                    <span className="font-semibold text-[11px] text-foreground">{exp.position}</span>
                    {exp.company && <span className="text-muted-foreground"> — {exp.company}</span>}
                  </div>
                  <span className="text-[8px] text-muted-foreground text-right">
                    {exp.startDate.month}/{exp.startDate.year}
                    {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                  </span>
                  <BulletList
                    items={exp.bullets}
                    className="col-span-2 mt-1 text-[9.5px]"
                  />
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Education + Skills */}
        {(education.length > 0 || skills.length > 0) && (
          <div className="flex gap-8">
            {education.length > 0 && (
              <div className="flex-1">
                <Heading size="sm">Education</Heading>
                <div className="flex flex-col gap-2">
                  {education.map((edu) => (
                    <EducationCard
                      key={edu.id}
                      school={edu.school}
                      degree={edu.degree}
                      field={edu.field}
                      gpa={edu.gpa}
                      honors={edu.honors}
                      startDate={edu.startDate}
                      endDate={edu.endDate}
                      current={edu.current}
                    />
                  ))}
                </div>
              </div>
            )}
            {skills.length > 0 && (
              <div className="flex-1">
                <Heading size="sm">Skills</Heading>
                <SkillsDisplay skills={skills} variant="tags" />
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Projects</Heading>
            <div className="flex flex-col gap-2">
              {projects.map((p) => (
                <div key={p.id} className="flex gap-4">
                  <div className="flex-1">
                    <span className="font-medium text-[10px] text-foreground">{p.name}</span>
                    {p.description && (
                      <p className="text-[9px] text-muted-foreground mt-[1px]">{p.description}</p>
                    )}
                  </div>
                  {p.technologies.filter(Boolean).length > 0 && (
                    <div className="text-right shrink-0">
                      {p.technologies.filter(Boolean).map((t, i) => (
                        <span key={i} className="text-[8px] text-muted-foreground block">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Certifications + Languages inline */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="flex gap-8">
            {certifications.length > 0 && (
              <div className="flex-1">
                <Heading size="sm">Certifications</Heading>
                <div className="flex flex-col gap-1">
                  {certifications.map((c) => (
                    <CertificationCard key={c.id} name={c.name} issuer={c.issuer} />
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div className="flex-1">
                <Heading size="sm">Languages</Heading>
                <LanguageDisplay items={languages} variant="inline" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
