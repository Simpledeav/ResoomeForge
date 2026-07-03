import type { Resume } from "@/lib/schema";
import { Section, Divider } from "@/components/templates/shared/Section";
import { formatDateRange } from "@/components/templates/shared/types";

interface ChronosProps {
  resume: Resume;
}

export function Chronos({ resume }: ChronosProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-5 p-8 font-sans text-[11px] leading-relaxed">
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold tracking-tight">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-sm font-medium text-muted-foreground">{personalInfo.title}</p>
        )}
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      <Divider />

      {/* Summary */}
      {summary && (
        <Section title="Professional Summary">
          <p className="text-justify leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          <div className="flex flex-col gap-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-semibold">{exp.position}</span>
                    {exp.company && <span className="text-muted-foreground"> at {exp.company}</span>}
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.location && (
                  <p className="text-[10px] text-muted-foreground">{exp.location}</p>
                )}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-[10.5px] leading-relaxed text-foreground/90">
                    {exp.bullets.filter(Boolean).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          <div className="flex flex-col gap-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-semibold">{edu.school}</span>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {edu.degree} in {edu.field}
                  {edu.gpa && <span> — GPA: {edu.gpa}</span>}
                </p>
                {edu.honors && <p className="text-[10px] text-muted-foreground">{edu.honors}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-col gap-1.5">
            {skills.map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <span className="w-20 shrink-0 font-medium text-[10px]">{skill.category}</span>
                <span className="text-foreground/90">
                  {skill.skills.filter(Boolean).join("  ·  ")}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section title="Certifications">
          <div className="flex flex-col gap-1.5">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <span className="font-medium">{cert.name}</span>
                {cert.issuer && <span className="text-muted-foreground"> — {cert.issuer}</span>}
                {cert.date && (
                  <span className="text-[10px] text-muted-foreground">
                    {" "}({cert.date.month}/{cert.date.year})
                  </span>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          <div className="flex flex-col gap-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-semibold">{proj.name}</span>
                    {proj.url && <span className="text-muted-foreground"> — {proj.url}</span>}
                  </div>
                  {proj.startDate && (
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {formatDateRange(proj.startDate, proj.endDate, proj.current)}
                    </span>
                  )}
                </div>
                {proj.description && <p className="text-[10.5px] text-foreground/90">{proj.description}</p>}
                {proj.technologies.filter(Boolean).length > 0 && (
                  <p className="text-[10px] text-muted-foreground">
                    {proj.technologies.filter(Boolean).join("  ·  ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <Section title="Languages">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {languages.map((lang) => (
              <span key={lang.id} className="text-[10.5px]">
                {lang.name}{" "}
                <span className="text-muted-foreground">({lang.proficiency})</span>
              </span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
