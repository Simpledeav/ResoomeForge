import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  SkillsDisplay,
  EducationCard,
  ProjectCard,
  CertificationCard,
  LanguageDisplay,
} from "@/components/templates/shared/TemplateBase";

export function Clean({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-4 p-10 font-sans text-[10.5px] leading-relaxed" style={wrapperStyle}>
      {/* Header — elegant, left-right split */}
      <div className="flex items-end justify-between border-b border-border pb-3">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-foreground">{fullName}</h1>
          {personalInfo.title && (
            <p className="text-xs text-muted-foreground mt-0.5">{personalInfo.title}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-0.5 text-[9px] text-muted-foreground">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <SectionBlock>
          <Heading size="sm">About</Heading>
          <p className="text-justify leading-relaxed text-foreground/90">{summary}</p>
        </SectionBlock>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <SectionBlock>
          <Heading size="sm">Experience</Heading>
          <div className="flex flex-col gap-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-foreground">{exp.position}</span>
                    {exp.company && <span className="text-muted-foreground"> — {exp.company}</span>}
                  </div>
                  <span className="shrink-0 text-[9px] text-muted-foreground">
                    {exp.startDate.month}/{exp.startDate.year}
                    {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                  </span>
                </div>
                <BulletList items={exp.bullets} className="mt-1 text-[10px]" />
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

      {/* Skills + Certifications inline */}
      {(skills.length > 0 || certifications.length > 0) && (
        <div className="flex gap-8">
          {skills.length > 0 && (
            <div className="flex-1">
              <Heading size="sm">Skills</Heading>
              <SkillsDisplay skills={skills} variant="columns" />
            </div>
          )}

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
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <SectionBlock>
          <Heading size="sm">Projects</Heading>
          <div className="flex flex-col gap-2">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                name={p.name}
                description={p.description}
                technologies={p.technologies}
                startDate={p.startDate}
                endDate={p.endDate}
                current={p.current}
              />
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <SectionBlock>
          <Heading size="sm">Languages</Heading>
          <LanguageDisplay items={languages} variant="inline" />
        </SectionBlock>
      )}
    </div>
  );
}
