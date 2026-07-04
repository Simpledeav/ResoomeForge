import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  SkillsDisplay,
  LanguageDisplay,
  CertificationCard,
} from "@/components/templates/shared/TemplateBase";

export function Apex({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed min-h-full" style={wrapperStyle}>
      {/* Header Bar — inverted */}
      <div className="bg-foreground text-background p-6 pb-5">
        <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-sm mt-1 opacity-80">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] opacity-70">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i}>{item}</span>
            ))}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column — sidebar */}
        <div className="w-[180px] shrink-0 bg-muted p-4 flex flex-col gap-4">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <Heading size="sm">Skills</Heading>
              <SkillsDisplay skills={skills} variant="tags" className="mt-1" />
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <Heading size="sm">Languages</Heading>
              <LanguageDisplay items={languages} variant="list" className="mt-1" />
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

          {personalInfo.linkedin && (
            <div className="text-[8px] text-muted-foreground break-all">
              {personalInfo.linkedin}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          {/* Summary */}
          {summary && (
            <SectionBlock>
              <Heading size="sm">Summary</Heading>
              <p className="text-[10px] leading-relaxed text-justify text-foreground/90">{summary}</p>
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
                      <span className="font-semibold text-[11px] text-foreground">{exp.position}</span>
                      <span className="shrink-0 text-[8px] text-muted-foreground">
                        {exp.startDate.month}/{exp.startDate.year}
                        {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                      </span>
                    </div>
                    {exp.company && (
                      <div className="text-[9px] text-muted-foreground">
                        {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                      </div>
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
                    <span className="font-medium text-[10px] text-foreground">{edu.school}</span>
                    <p className="text-[9px] text-muted-foreground">
                      {edu.degree} in {edu.field}
                      {" · "}
                      {edu.startDate.month}/{edu.startDate.year}
                      {edu.current ? " – Present" : edu.endDate ? ` – ${edu.endDate.month}/${edu.endDate.year}` : ""}
                    </p>
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
                    <span className="font-medium text-[10px] text-foreground">{p.name}</span>
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
    </div>
  );
}
