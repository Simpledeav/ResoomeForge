import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  SkillsDisplay,
  EducationCard,
  LanguageDisplay,
} from "@/components/templates/shared/TemplateBase";

export function Vibrant({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col font-sans text-[10.5px] leading-relaxed" style={wrapperStyle}>
      {/* Vibrant header with gradient strip */}
      <div className="bg-foreground text-background p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-emerald-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400" />
        <h1 className="text-xl font-extrabold tracking-tight">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-xs mt-0.5 font-medium text-emerald-300">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-[9px] opacity-75">
          {[personalInfo.email, personalInfo.phone, personalInfo.location]
            .filter(Boolean)
            .join("  ·  ")}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Summary — with subtle background */}
        {summary && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-3 border border-emerald-200/50 dark:border-emerald-800/30">
            <p className="text-[10px] leading-relaxed text-foreground/90">{summary}</p>
          </div>
        )}

        {/* Experience — timeline style */}
        {experience.length > 0 && (
          <SectionBlock>
            <Heading color="text-emerald-600 dark:text-emerald-400">Experience</Heading>
            <div className="flex flex-col gap-3">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-4 border-l-2 border-emerald-200 dark:border-emerald-800 ml-1"
                >
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-[11px] text-foreground">{exp.position}</span>
                    <span className="shrink-0 text-[8px] text-muted-foreground">
                      {exp.startDate.month}/{exp.startDate.year}
                      {exp.current ? " – Present" : exp.endDate ? ` – ${exp.endDate.month}/${exp.endDate.year}` : ""}
                    </span>
                  </div>
                  {exp.company && (
                    <div className="text-[9px] font-medium text-emerald-600/70 dark:text-emerald-400/70">
                      {exp.company}
                    </div>
                  )}
                  <BulletList items={exp.bullets} className="mt-1 text-[9.5px]" />
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Education + Skills inline */}
        {(education.length > 0 || skills.length > 0) && (
          <div className="flex gap-6">
            {education.length > 0 && (
              <div className="flex-1">
                <Heading color="text-cyan-600 dark:text-cyan-400">Education</Heading>
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
                <Heading color="text-violet-600 dark:text-violet-400">Skills</Heading>
                <SkillsDisplay skills={skills} variant="tags" />
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <SectionBlock>
            <Heading color="text-cyan-600 dark:text-cyan-400">Projects</Heading>
            <div className="flex flex-col gap-2">
              {projects.map((p) => (
                <div key={p.id} className="mb-1">
                  <span className="font-bold text-[10px] text-foreground">{p.name}</span>
                  {p.description && (
                    <p className="text-[9.5px] text-foreground/85 mt-[1px]">{p.description}</p>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <SectionBlock>
            <Heading color="text-violet-600 dark:text-violet-400">Certifications</Heading>
            <div className="flex flex-col gap-1">
              {certifications.map((c) => (
                <div key={c.id} className="text-[9px]">
                  <span className="font-medium">{c.name}</span>
                  {c.issuer && <span className="text-muted-foreground"> · {c.issuer}</span>}
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <SectionBlock>
            <Heading color="text-emerald-600 dark:text-emerald-400">Languages</Heading>
            <LanguageDisplay items={languages} variant="inline" />
          </SectionBlock>
        )}
      </div>
    </div>
  );
}
