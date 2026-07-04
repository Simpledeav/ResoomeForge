import type { TemplateProps } from "@/components/templates/shared/types";
import {
  SectionBlock,
  Heading,
  ContactList,
  SkillsDisplay,
  LanguageDisplay,
  CertificationCard,
  ExperienceCard,
  EducationCard,
  ProjectCard,
} from "@/components/templates/shared/TemplateBase";

export function Executive({ resume, wrapperStyle }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Your Name";

  return (
    <div className="flex min-h-full font-sans text-[10.5px] leading-relaxed" style={wrapperStyle}>
      {/* Sidebar */}
      <div className="w-[170px] shrink-0 bg-muted p-5 flex flex-col gap-5">
        {/* Name & Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-bold tracking-tight leading-tight text-foreground">{fullName}</h1>
          {personalInfo.title && (
            <p className="text-[10px] font-medium text-muted-foreground">{personalInfo.title}</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <Heading size="sm" color="text-muted-foreground" divider={false}>Contact</Heading>
          <ContactList
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

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <Heading size="sm" color="text-muted-foreground" divider={false}>Skills</Heading>
            <SkillsDisplay skills={skills} variant="tags" className="mt-1.5" />
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <Heading size="sm" color="text-muted-foreground" divider={false}>Languages</Heading>
            <LanguageDisplay items={languages} variant="list" className="mt-1.5" />
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <Heading size="sm" color="text-muted-foreground" divider={false}>Certifications</Heading>
            <div className="flex flex-col gap-1.5 mt-1.5">
              {certifications.map((c) => (
                <CertificationCard key={c.id} name={c.name} issuer={c.issuer} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Summary */}
        {summary && (
          <SectionBlock>
            <Heading size="sm">Summary</Heading>
            <p className="text-justify text-[10.5px] leading-relaxed text-foreground/90">{summary}</p>
          </SectionBlock>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <SectionBlock>
            <Heading size="sm">Experience</Heading>
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
      </div>
    </div>
  );
}
