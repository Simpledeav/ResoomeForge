import type { Resume } from "@/lib/schema";

export function exportTxt(resume: Resume): Blob {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const lines: string[] = [];

  // Header
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
  if (fullName) lines.push(fullName.toUpperCase());
  if (personalInfo.title) lines.push(personalInfo.title);
  lines.push("");

  // Contact
  const contact = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean);
  if (contact.length > 0) {
    lines.push(contact.join("  |  "));
    lines.push("");
  }

  // Summary
  if (summary) {
    lines.push("PROFESSIONAL SUMMARY");
    lines.push("-".repeat(40));
    lines.push(summary);
    lines.push("");
  }

  // Experience
  if (experience.length > 0) {
    lines.push("EXPERIENCE");
    lines.push("-".repeat(40));
    experience.forEach((exp) => {
      const dates = exp.startDate
        ? `${exp.startDate.month}/${exp.startDate.year} – ${exp.current ? "Present" : exp.endDate ? `${exp.endDate.month}/${exp.endDate.year}` : ""}`
        : "";
      lines.push(`${exp.position} at ${exp.company}`);
      if (exp.location) lines.push(`  ${exp.location}  (${dates})`);
      else if (dates) lines.push(`  ${dates}`);
      exp.bullets.filter(Boolean).forEach((b) => lines.push(`  • ${b}`));
      lines.push("");
    });
  }

  // Education
  if (education.length > 0) {
    lines.push("EDUCATION");
    lines.push("-".repeat(40));
    education.forEach((edu) => {
      const degree = [edu.degree, edu.field].filter(Boolean).join(" in ");
      const dates = edu.startDate
        ? `${edu.startDate.month}/${edu.startDate.year} – ${edu.current ? "Present" : edu.endDate ? `${edu.endDate.month}/${edu.endDate.year}` : ""}`
        : "";
      lines.push(degree ? `${degree} — ${edu.school}` : edu.school);
      if (dates) lines.push(`  ${dates}`);
      if (edu.gpa) lines.push(`  GPA: ${edu.gpa}`);
      if (edu.honors) lines.push(`  ${edu.honors}`);
      lines.push("");
    });
  }

  // Skills
  if (skills.length > 0) {
    lines.push("SKILLS");
    lines.push("-".repeat(40));
    skills.forEach((s) => {
      const skillList = s.skills.filter(Boolean).join(", ");
      lines.push(s.category ? `${s.category}: ${skillList}` : skillList);
    });
    lines.push("");
  }

  // Certifications
  if (certifications.length > 0) {
    lines.push("CERTIFICATIONS");
    lines.push("-".repeat(40));
    certifications.forEach((c) => {
      lines.push(c.issuer ? `${c.name} — ${c.issuer}` : c.name);
    });
    lines.push("");
  }

  // Projects
  if (projects.length > 0) {
    lines.push("PROJECTS");
    lines.push("-".repeat(40));
    projects.forEach((p) => {
      lines.push(p.name);
      if (p.description) lines.push(`  ${p.description}`);
      if (p.technologies.filter(Boolean).length > 0) lines.push(`  Tech: ${p.technologies.filter(Boolean).join(", ")}`);
      lines.push("");
    });
  }

  // Languages
  if (languages.length > 0) {
    lines.push("LANGUAGES");
    lines.push("-".repeat(40));
    languages.forEach((l) => lines.push(`${l.name} (${l.proficiency})`));
    lines.push("");
  }

  // Websites/Links
  const links = [personalInfo.website && `Website: ${personalInfo.website}`, personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`, personalInfo.github && `GitHub: ${personalInfo.github}`].filter(Boolean);
  if (links.length > 0) {
    lines.push("LINKS");
    lines.push("-".repeat(40));
    links.forEach((l) => lines.push(l));
  }

  return new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
}
