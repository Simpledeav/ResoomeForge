import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  SkillsDisplay,
  LanguageDisplay,
  EducationCard,
} from "@/components/templates/shared/TemplateBase";

export function Creative({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed" style={wrapperStyle}>
      {/* Colorful Header */}
      <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 p-6 text-white">
        <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-sm mt-1 opacity-90">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] opacity-80">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website, personalInfo.linkedin]
            .filter(Boolean)
            .join("  ·  ")}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Summary — with colored left border */}
        {summary && (
          <div className="rounded-lg border-l-4 border-purple-400 pl-3">
            <p className="text-justify leading-relaxed text-foreground/90">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <SectionBlock>
            <Heading color="text-purple-600">Experience</Heading>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div key={exp.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-[11px] text-foreground">{exp.position}</span>
                      {exp.company && <span className="text-muted-foreground"> at {exp.company}</span>}
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

        {/* Education & Skills inline */}
        {(education.length > 0 || skills.length > 0) && (
          <div className="flex gap-6">
            {education.length > 0 && (
              <div className="flex-1">
                <Heading color="text-rose-500">Education</Heading>
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
              </div>
            )}
            {skills.length > 0 && (
              <div className="flex-1">
                <Heading color="text-indigo-500">Skills</Heading>
                <SkillsDisplay skills={skills} variant="tags" />
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <SectionBlock>
            <Heading color="text-rose-500">Projects</Heading>
            <div className="flex flex-col gap-2">
              {projects.map((p) => (
                <div key={p.id} className="mb-1">
                  <span className="font-semibold text-foreground">{p.name}</span>
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

        {/* Languages */}
        {languages.length > 0 && (
          <SectionBlock>
            <Heading color="text-indigo-500">Languages</Heading>
            <div className="flex flex-wrap gap-x-4 text-[9.5px]">
              {languages.map((l) => (
                <span key={l.id}>
                  {l.name} <span className="text-muted-foreground">({l.proficiency})</span>
                </span>
              ))}
            </div>
          </SectionBlock>
        )}
      </div>
    </div>
  );
}
