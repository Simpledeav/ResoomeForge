import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  ContactRow,
  Divider,
  SkillsDisplay,
  ExperienceCard,
  EducationCard,
  ProjectCard,
  CertificationCard,
  LanguageDisplay,
} from "@/components/templates/shared/TemplateBase";

export function Chronos({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex flex-col gap-4 p-8 font-sans text-[10.5px] leading-relaxed" style={wrapperStyle}>
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold tracking-tight text-foreground">{fullName}</h1>
        {personalInfo.title && (
          <p className="text-xs font-medium text-muted-foreground">{personalInfo.title}</p>
        )}
        <ContactRow
          items={[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
            personalInfo.website,
            personalInfo.linkedin,
          ]}
          className="mt-1"
        />
      </div>

      <Divider />

      {/* Summary */}
      {summary && (
        <SectionBlock>
          <Heading>Professional Summary</Heading>
          <p className="text-justify leading-relaxed text-foreground/90">{summary}</p>
        </SectionBlock>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <SectionBlock>
          <Heading>Experience</Heading>
          <div className="flex flex-col gap-3">
            {experience.map((exp) => (
              <ExperienceCard
                key={exp.id}
                position={exp.position}
                company={exp.company}
                location={exp.location}
                startDate={exp.startDate}
                endDate={exp.endDate}
                current={exp.current}
                bullets={exp.bullets}
              />
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Education */}
      {education.length > 0 && (
        <SectionBlock>
          <Heading>Education</Heading>
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
        </SectionBlock>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <SectionBlock>
          <Heading>Skills</Heading>
          <SkillsDisplay skills={skills} variant="inline" />
        </SectionBlock>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <SectionBlock>
          <Heading>Certifications</Heading>
          <div className="flex flex-col gap-1">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                name={cert.name}
                issuer={cert.issuer}
                date={cert.date}
              />
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <SectionBlock>
          <Heading>Projects</Heading>
          <div className="flex flex-col gap-2">
            {projects.map((proj) => (
              <ProjectCard
                key={proj.id}
                name={proj.name}
                description={proj.description}
                technologies={proj.technologies}
                url={proj.url}
                startDate={proj.startDate}
                endDate={proj.endDate}
                current={proj.current}
              />
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <SectionBlock>
          <Heading>Languages</Heading>
          <LanguageDisplay items={languages} variant="inline" />
        </SectionBlock>
      )}
    </div>
  );
}
