import {
  Document,
  Paragraph,
  TextRun,
  Packer,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from "docx";
import type { Resume } from "@/lib/schema";

function formatDate(month: number, year: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[month - 1]} ${year}`;
}

function formatDateRange(
  start: { month: number; year: number },
  end?: { month: number; year: number },
  current?: boolean,
): string {
  if (current) return `${formatDate(start.month, start.year)} – Present`;
  if (end) return `${formatDate(start.month, start.year)} – ${formatDate(end.month, end.year)}`;
  return formatDate(start.month, start.year);
}

export async function exportDocx(resume: Resume): Promise<Blob> {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Resume";

  const children: (Paragraph | Table)[] = [];

  // === HEADER ===
  children.push(
    new Paragraph({
      children: [new TextRun({ text: fullName, bold: true, size: 28 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
    }),
  );

  if (personalInfo.title) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: personalInfo.title, size: 20, color: "555555" })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
    );
  }

  const contact = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website].filter(Boolean);
  if (contact.length > 0) {
    children.push(
      new Paragraph({
        children: contact.map((item, i) =>
          new TextRun({
            text: i < contact.length - 1 ? `${item}  |  ` : item,
            size: 16,
            color: "666666",
          }),
        ),
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
    );
  }

  // Horizontal rule
  children.push(
    new Paragraph({
      children: [],
      spacing: { after: 120 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" },
      },
    }),
  );

  // === SUMMARY ===
  if (summary) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "PROFESSIONAL SUMMARY", bold: true, size: 16, color: "666666" })],
        spacing: { before: 120, after: 60 },
      }),
    );
    children.push(
      new Paragraph({
        children: [new TextRun({ text: summary, size: 18 })],
        spacing: { after: 120 },
      }),
    );
  }

  // === EXPERIENCE ===
  if (experience.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "EXPERIENCE", bold: true, size: 16, color: "666666" })],
        spacing: { before: 120, after: 100 },
      }),
    );

    experience.forEach((exp) => {
      // Position + Date row
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position || "Position", bold: true, size: 20 }),
            new TextRun({
              text: `    ${formatDateRange(exp.startDate, exp.endDate, exp.current)}`,
              size: 16,
              color: "666666",
            }),
          ],
          spacing: { after: 20 },
        }),
      );

      if (exp.company) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: exp.company, size: 18, color: "555555" })],
            spacing: { after: 40 },
          }),
        );
      }

      exp.bullets.filter(Boolean).forEach((b) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: "•  ", size: 18 }),
              new TextRun({ text: b, size: 18 }),
            ],
            indent: { left: 360 },
            spacing: { after: 20 },
          }),
        );
      });

      children.push(new Paragraph({ spacing: { after: 80 } }));
    });
  }

  // === EDUCATION ===
  if (education.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "EDUCATION", bold: true, size: 16, color: "666666" })],
        spacing: { before: 120, after: 100 },
      }),
    );

    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.school || "School", bold: true, size: 20 }),
            new TextRun({
              text: `    ${formatDateRange(edu.startDate, edu.endDate, edu.current)}`,
              size: 16,
              color: "666666",
            }),
          ],
          spacing: { after: 20 },
        }),
      );

      const degree = [edu.degree, edu.field].filter(Boolean).join(" in ");
      if (degree) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: degree, size: 18, color: "555555" })],
            spacing: { after: 20 },
          }),
        );
      }

      if (edu.gpa) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: `GPA: ${edu.gpa}`, size: 16, color: "666666" })],
            spacing: { after: 40 },
          }),
        );
      }

      children.push(new Paragraph({ spacing: { after: 60 } }));
    });
  }

  // === SKILLS ===
  if (skills.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "SKILLS", bold: true, size: 16, color: "666666" })],
        spacing: { before: 120, after: 100 },
      }),
    );

    skills.forEach((s) => {
      const skillText = s.skills.filter(Boolean).join(", ");
      if (s.category) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${s.category}:  `, bold: true, size: 18 }),
              new TextRun({ text: skillText, size: 18, color: "555555" }),
            ],
            spacing: { after: 40 },
          }),
        );
      } else if (skillText) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: skillText, size: 18, color: "555555" })],
            spacing: { after: 40 },
          }),
        );
      }
    });
  }

  // === CERTIFICATIONS ===
  if (certifications.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "CERTIFICATIONS", bold: true, size: 16, color: "666666" })],
        spacing: { before: 120, after: 100 },
      }),
    );

    certifications.forEach((c) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: c.name, bold: true, size: 18 }),
            ...(c.issuer ? [new TextRun({ text: `  —  ${c.issuer}`, size: 18, color: "555555" })] : []),
          ],
          spacing: { after: 40 },
        }),
      );
    });
  }

  // === PROJECTS ===
  if (projects.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "PROJECTS", bold: true, size: 16, color: "666666" })],
        spacing: { before: 120, after: 100 },
      }),
    );

    projects.forEach((p) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: p.name, bold: true, size: 20 }),
            ...(p.startDate
              ? [new TextRun({ text: `    ${formatDateRange(p.startDate, p.endDate, p.current)}`, size: 16, color: "666666" })]
              : []),
          ],
          spacing: { after: 20 },
        }),
      );

      if (p.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: p.description, size: 18 })],
            spacing: { after: 20 },
          }),
        );
      }

      if (p.technologies.filter(Boolean).length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: p.technologies.filter(Boolean).join("  ·  "), size: 16, color: "666666" })],
            spacing: { after: 60 },
          }),
        );
      }
    });
  }

  // === LANGUAGES ===
  if (languages.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "LANGUAGES", bold: true, size: 16, color: "666666" })],
        spacing: { before: 120, after: 100 },
      }),
    );

    const langText = languages.map((l) => `${l.name} (${l.proficiency})`).join("    ");
    children.push(
      new Paragraph({
        children: [new TextRun({ text: langText, size: 18, color: "555555" })],
        spacing: { after: 60 },
      }),
    );
  }

  const doc = new Document({
    sections: [{ children }],
  });

  return await Packer.toBlob(doc);
}
