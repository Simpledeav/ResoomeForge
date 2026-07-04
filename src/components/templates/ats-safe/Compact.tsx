import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  ContactRow,
  SkillsDisplay,
  LanguageDisplay,
} from "@/components/templates/shared/TemplateBase";

export function Compact({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-2.5 p-6 font-sans text-[10px] leading-snug" style={wrapperStyle}>
      {/* Header — compact centered */}
      <div className="text-center border-b border-border pb-2">
        <h1 className="text-base font-bold tracking-tight text-foreground">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-[11px] font-medium text-muted-foreground">{personalInfo.title}</p>
        )}
        <ContactRow
          items={[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.website,
          ]}
          className="mt-1 justify-center"
          separator="|"
        />
      </div>

      {/* Summary — no heading, just the text */}
      {summary && (
        <p className="text-[10px] text-justify leading-relaxed text-foreground/90">{summary}</p>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <SectionBlock>
          <Heading size="sm">Experience</Heading>
          <div className="flex flex-col gap-2">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-[10.5px] text-foreground">
                    {exp.position}
                    {exp.company && (
                      <span className="font-normal text-muted-foreground"> | {exp.company}</span>
                    )}
                  </div>
                  <span className="shrink-0 text-[8px] text-muted-foreground">
                    {exp.startDate.month}/{exp.startDate.year}
                    {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                  </span>
                </div>
                <BulletList items={exp.bullets} className="mt-0.5 text-[9.5px]" />
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Education + Skills inline */}
      {(education.length > 0 || skills.length > 0) && (
        <div className="flex gap-4">
          {education.length > 0 && (
            <div className="flex-1">
              <Heading size="sm">Education</Heading>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1">
                  <div className="font-medium text-[9.5px]">{edu.school}</div>
                  <div className="text-[9px] text-muted-foreground">
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-[8px] text-muted-foreground">
                    {edu.startDate.month}/{edu.startDate.year}
                    {edu.current ? " – Present" : edu.endDate ? ` – ${edu.endDate.month}/${edu.endDate.year}` : ""}
                    {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="flex-1">
              <Heading size="sm">Skills</Heading>
              <SkillsDisplay skills={skills} variant="columns" />
            </div>
          )}
        </div>
      )}

      {/* Projects + Certifications inline */}
      {(projects.length > 0 || certifications.length > 0) && (
        <div className="flex gap-4">
          {projects.length > 0 && (
            <div className="flex-1">
              <Heading size="sm">Projects</Heading>
              {projects.map((p) => (
                <div key={p.id} className="mb-1">
                  <div className="font-medium text-[9.5px]">{p.name}</div>
                  {p.description && <div className="text-[9px]">{p.description}</div>}
                  {p.technologies.filter(Boolean).length > 0 && (
                    <div className="text-[8px] text-muted-foreground">
                      {p.technologies.filter(Boolean).join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="flex-1">
              <Heading size="sm">Certifications</Heading>
              {certifications.map((c) => (
                <div key={c.id} className="mb-1 text-[9px]">
                  <div className="font-medium">{c.name}</div>
                  {c.issuer && <div className="text-muted-foreground">{c.issuer}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
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
