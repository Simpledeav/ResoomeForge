"use client";

import { pdf, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Resume } from "@/lib/schema";
// Helvetica is built-in to @react-pdf/renderer — no font registration needed

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#000",
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontSize: 11,
    color: "#555",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    fontSize: 8,
    color: "#666",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#666",
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 3,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 10,
    fontWeight: "bold",
  },
  expCompany: {
    fontSize: 9,
    color: "#555",
  },
  expDate: {
    fontSize: 8,
    color: "#666",
  },
  bulletList: {
    marginTop: 2,
    marginLeft: 12,
  },
  bullet: {
    fontSize: 9,
    marginBottom: 1,
    lineHeight: 1.35,
  },
  inlineRow: {
    flexDirection: "row",
    gap: 12,
  },
  inlineCol: {
    flex: 1,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,
    fontSize: 9,
  },
  skillCategory: {
    width: 80,
    fontWeight: "bold",
  },
  skillItems: {
    flex: 1,
    color: "#555",
  },
  educationRow: {
    marginBottom: 6,
  },
  eduSchool: {
    fontSize: 10,
    fontWeight: "bold",
  },
  eduDetail: {
    fontSize: 9,
    color: "#555",
  },
  eduDate: {
    fontSize: 8,
    color: "#666",
  },
  langRow: {
    flexDirection: "row",
    gap: 12,
    fontSize: 9,
  },
  langItem: {
    color: "#555",
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 12,
    color: "#333",
  },
});

function formatDate(month: number, year: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[month - 1]} ${year}`;
}

function PdfDocument({ resume }: { resume: Resume }) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, languages } = resume;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "Resume";

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          {personalInfo.title && <Text style={styles.title}>{personalInfo.title}</Text>}
          {contactItems.length > 0 && (
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <Text key={i}>
                  {item}
                  {i < contactItems.length - 1 ? "  ·" : ""}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
                <View style={styles.expHeader}>
                  <View>
                    <Text style={styles.expPosition}>{exp.position}</Text>
                    {exp.company && <Text style={styles.expCompany}>{exp.company}</Text>}
                  </View>
                  <Text style={styles.expDate}>
                    {formatDate(exp.startDate.month, exp.startDate.year)}
                    {exp.current ? " – Present" : exp.endDate ? ` – ${formatDate(exp.endDate.month, exp.endDate.year)}` : ""}
                  </Text>
                </View>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <Text key={i} style={styles.bullet}>• {b}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education & Skills inline */}
        <View style={styles.inlineRow}>
          {education.length > 0 && (
            <View style={[styles.inlineCol, styles.section]}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.educationRow}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDetail}>
                    {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                    {edu.gpa ? ` — GPA: ${edu.gpa}` : ""}
                  </Text>
                  <Text style={styles.eduDate}>
                    {formatDate(edu.startDate.month, edu.startDate.year)}
                    {edu.current ? " – Present" : edu.endDate ? ` – ${formatDate(edu.endDate.month, edu.endDate.year)}` : ""}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {skills.length > 0 && (
            <View style={[styles.inlineCol, styles.section]}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {skills.map((s) => (
                <View key={s.id} style={styles.skillRow}>
                  {s.category && <Text style={styles.skillCategory}>{s.category}</Text>}
                  <Text style={styles.skillItems}>
                    {s.skills.filter(Boolean).join(", ")}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p) => (
              <View key={p.id} style={{ marginBottom: 4 }}>
                <View style={styles.expHeader}>
                  <Text style={styles.expPosition}>{p.name}</Text>
                  {p.startDate && (
                    <Text style={styles.expDate}>
                      {formatDate(p.startDate.month, p.startDate.year)}
                      {p.current ? " – Present" : p.endDate ? ` – ${formatDate(p.endDate.month, p.endDate.year)}` : ""}
                    </Text>
                  )}
                </View>
                {p.description && <Text style={{ fontSize: 8.5, color: "#444", marginBottom: 1 }}>{p.description}</Text>}
                {p.technologies.filter(Boolean).length > 0 && (
                  <Text style={{ fontSize: 8, color: "#888" }}>{p.technologies.filter(Boolean).join("  ·  ")}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications + Languages inline */}
        <View style={styles.inlineRow}>
          {certifications.length > 0 && (
            <View style={[styles.inlineCol, styles.section]}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certifications.map((c) => (
                <View key={c.id} style={{ marginBottom: 2 }}>
                  <Text style={{ fontSize: 9, fontWeight: "bold" }}>{c.name}</Text>
                  {c.issuer && <Text style={{ fontSize: 8, color: "#666" }}>{c.issuer}</Text>}
                </View>
              ))}
            </View>
          )}

          {languages.length > 0 && (
            <View style={[styles.inlineCol, styles.section]}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.langRow}>
                {languages.map((l) => (
                  <Text key={l.id} style={styles.langItem}>
                    {l.name} ({l.proficiency})
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

export async function exportPdf(resume: Resume): Promise<Blob> {
  const blob = await pdf(<PdfDocument resume={resume} />).toBlob();
  return blob;
}
