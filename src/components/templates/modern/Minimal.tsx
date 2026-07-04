import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  ContactRow,
  SkillsDisplay,
  EducationCard,
  LanguageDisplay,
} from "@/components/templates/shared/TemplateBase";

export function Minimal({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-5 p-10 font-sans text-[10.5px] leading-relaxed max-w-[700px] mx-auto" style={wrapperStyle}>
      {/* Header — generous whitespace, bold bottom border */}
      <div className="flex flex-col gap-1 pb-4 border-b-2 border-foreground">
        <h1 className="text-[26px] font-bold tracking-tight leading-none text-foreground">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-sm text-muted-foreground font-medium">{personalInfo.title}</p>
        )}
        <ContactRow
          items={[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.website && `· ${personalInfo.website}`,
            personalInfo.linkedin && `· ${personalInfo.linkedin}`,
          ]}
          className="mt-1"
        />
      </div>

      {/* Summary */}
      {summary && (
        <p className="text-[10.5px] leading-relaxed text-justify text-foreground/90">{summary}</p>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <SectionBlock>
          <Heading size="sm" color="text-muted-foreground">Experience</Heading>
          <div className="flex flex-col gap-3.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-foreground">{exp.position}</span>
                    {exp.company && <span className="text-muted-foreground">, {exp.company}</span>}
                  </div>
                  <span className="shrink-0 text-[9px] text-muted-foreground">
                    {exp.startDate.month}/{exp.startDate.year}
                    {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                  </span>
                </div>
                {exp.location && (
                  <p className="text-[9px] text-muted-foreground mt-[1px]">{exp.location}</p>
                )}
                <BulletList items={exp.bullets} className="mt-1 text-[10px]" spaced />
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Education */}
      {education.length > 0 && (
        <SectionBlock>
          <Heading size="sm" color="text-muted-foreground">Education</Heading>
          <div className="flex flex-col gap-2">
            {education.map((edu) => (
              <EducationCard
                key={edu.id}
                school={edu.school}
                degree={edu.degree}
                field={edu.field}
                gpa={edu.gpa}
                startDate={edu.startDate}
                endDate={edu.endDate}
                current={edu.current}
              />
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <SectionBlock>
          <Heading size="sm" color="text-muted-foreground">Skills</Heading>
          <SkillsDisplay skills={skills} variant="columns" />
        </SectionBlock>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <SectionBlock>
          <Heading size="sm" color="text-muted-foreground">Projects</Heading>
          <div className="flex flex-col gap-2">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-medium text-foreground">{p.name}</span>
                  {p.startDate && (
                    <span className="shrink-0 text-[9px] text-muted-foreground">
                      {p.startDate.month}/{p.startDate.year}
                      {p.current ? " – Present" : p.endDate ? ` – ${p.endDate.month}/${p.endDate.year}` : ""}
                    </span>
                  )}
                </div>
                {p.description && (
                  <p className="text-[9.5px] text-foreground/85 mt-[1px]">{p.description}</p>
                )}
                {p.technologies.filter(Boolean).length > 0 && (
                  <p className="text-[8.5px] text-muted-foreground mt-[1px]">
                    {p.technologies.filter(Boolean).join("  ·  ")}
                  </p>
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
              <Heading size="sm" color="text-muted-foreground">Certifications</Heading>
              <div className="flex flex-col gap-1">
                {certifications.map((c) => (
                  <div key={c.id} className="text-[9.5px]">
                    <span className="font-medium">{c.name}</span>
                    {c.issuer && <span className="text-muted-foreground"> — {c.issuer}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="flex-1">
              <Heading size="sm" color="text-muted-foreground">Languages</Heading>
              <LanguageDisplay items={languages} variant="inline" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
