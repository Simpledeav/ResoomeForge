import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  BulletList,
  SkillsDisplay,
  LanguageDisplay,
  CertificationCard,
} from "@/components/templates/shared/TemplateBase";

export function Sidebar({ resume, accentColor = "#0070f3", wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex min-h-full font-sans text-[10.5px] leading-relaxed" style={wrapperStyle}>
      {/* Sidebar with accent color */}
      <div
        className="w-[180px] shrink-0 p-5 flex flex-col gap-5"
        style={{ backgroundColor: accentColor || "#0070f3", color: "#fff" }}
      >
        <div>
          <h1 className="text-sm font-bold leading-tight">{fullName}</h1>
          {personalInfo.title && (
            <p className="text-[10px] mt-1 opacity-80">{personalInfo.title}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <Heading size="sm" color="text-white/70" divider={false}>Contact</Heading>
          <div className="flex flex-col gap-1 text-[10px] opacity-90 mt-1.5">
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
            <Heading size="sm" color="text-white/70" divider={false}>Skills</Heading>
            <div className="flex flex-col gap-2 mt-1.5">
              {skills.map((s) => (
                <div key={s.id}>
                  <div className="text-[9px] font-medium mb-1 opacity-90">{s.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {s.skills.filter(Boolean).map((skill, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-sm bg-white/15 px-1.5 py-[1px] text-[8px]"
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

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <Heading size="sm" color="text-white/70" divider={false}>Languages</Heading>
            <LanguageDisplay items={languages} variant="list" className="mt-1.5" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Summary */}
        {summary && (
          <p className="text-justify text-[10.5px] leading-relaxed text-foreground/90">{summary}</p>
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
                      <span className="font-semibold text-[11px] text-foreground">{exp.position}</span>
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

        {/* Education */}
        {education.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Education</Heading>
            <div className="flex flex-col gap-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-medium text-foreground">{edu.school}</span>
                    <p className="text-[9.5px] text-muted-foreground">
                      {edu.degree} in {edu.field}
                    </p>
                  </div>
                  <span className="shrink-0 text-[9px] text-muted-foreground">
                    {edu.startDate.month}/{edu.startDate.year}
                    {edu.current ? " – Present" : edu.endDate ? ` – ${edu.endDate.month}/${edu.endDate.year}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Certifications</Heading>
            <div className="flex flex-col gap-1">
              {certifications.map((c) => (
                <CertificationCard key={c.id} name={c.name} issuer={c.issuer} />
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
                  <span className="font-medium text-foreground">{p.name}</span>
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
      </div>
    </div>
  );
}
