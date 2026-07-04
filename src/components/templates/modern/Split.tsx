import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  SkillsDisplay,
  LanguageDisplay,
  EducationCard,
} from "@/components/templates/shared/TemplateBase";

export function Split({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex font-sans text-[10px] leading-relaxed min-h-full" style={wrapperStyle}>
      {/* Left Column — contact, summary, education, skills, languages, certs */}
      <div className="w-1/2 border-r border-border p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="border-b border-border pb-3">
          <h1 className="text-lg font-bold tracking-tight text-foreground">{fullName}</h1>
          {personalInfo.title && (
            <p className="text-[11px] text-muted-foreground mt-0.5">{personalInfo.title}</p>
          )}
          <div className="flex flex-col gap-0.5 mt-2 text-[9px] text-muted-foreground">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <SectionBlock>
            <Heading size="sm">About</Heading>
            <p className="text-[9.5px] leading-relaxed text-justify text-foreground/90">{summary}</p>
          </SectionBlock>
        )}

        {/* Education */}
        {education.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Education</Heading>
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
            <Heading size="sm">Skills</Heading>
            <SkillsDisplay skills={skills} variant="tags" />
          </SectionBlock>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Languages</Heading>
            <LanguageDisplay items={languages} variant="list" />
          </SectionBlock>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Certifications</Heading>
            <div className="flex flex-col gap-1 text-[9px]">
              {certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-medium">{c.name}</span>
                  {c.issuer && <span className="text-muted-foreground"> — {c.issuer}</span>}
                </div>
              ))}
            </div>
          </SectionBlock>
        )}
      </div>

      {/* Right Column — experience, projects */}
      <div className="w-1/2 p-5 flex flex-col gap-4">
        {/* Experience */}
        {experience.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Experience</Heading>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-[10px] text-foreground">{exp.position}</span>
                    <span className="shrink-0 text-[8px] text-muted-foreground">
                      {exp.startDate.month}/{exp.startDate.year}
                      {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                    </span>
                  </div>
                  {exp.company && (
                    <div className="text-[9px] text-muted-foreground mt-[1px]">{exp.company}</div>
                  )}
                  <BulletList items={exp.bullets} className="mt-1 text-[9px]" />
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Projects</Heading>
            <div className="flex flex-col gap-2">
              {projects.map((p) => (
                <div key={p.id} className="mb-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-[10px] text-foreground">{p.name}</span>
                    {p.startDate && (
                      <span className="shrink-0 text-[8px] text-muted-foreground">
                        {p.startDate.month}/{p.startDate.year}
                        {p.current ? " – Present" : p.endDate ? ` – ${p.endDate.month}/${p.endDate.year}` : ""}
                      </span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-[9px] text-foreground/85 mt-[1px]">{p.description}</p>
                  )}
                  {p.technologies.filter(Boolean).length > 0 && (
                    <p className="text-[8px] text-muted-foreground mt-[1px]">
                      {p.technologies.filter(Boolean).join("  ·  ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </SectionBlock>
        )}
      </div>
    </div>
  );
}
