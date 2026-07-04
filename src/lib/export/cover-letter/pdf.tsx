"use client";

import { pdf, Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { CoverLetter } from "@/lib/schema/cover-letter";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#000",
  },
  senderName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  senderInfo: {
    fontSize: 8,
    color: "#555",
    marginBottom: 1,
  },
  spacer: {
    marginBottom: 20,
  },
  date: {
    fontSize: 9,
    marginBottom: 12,
    color: "#666",
  },
  recipientLine: {
    fontSize: 9,
    marginBottom: 1,
    color: "#333",
  },
  greeting: {
    fontSize: 10,
    marginTop: 16,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 9.5,
    marginBottom: 8,
    lineHeight: 1.6,
    textAlign: "justify",
  },
  signOff: {
    fontSize: 10,
    marginTop: 16,
    marginBottom: 4,
  },
  senderNameBlock: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
  },
});

function CoverLetterPdfDocument({ letter }: { letter: CoverLetter }) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sender info */}
        {letter.senderName && (
          <Text style={styles.senderName}>{letter.senderName}</Text>
        )}
        {letter.senderTitle && (
          <Text style={styles.senderInfo}>{letter.senderTitle}</Text>
        )}
        {letter.senderEmail && (
          <Text style={styles.senderInfo}>{letter.senderEmail}</Text>
        )}
        {letter.senderPhone && (
          <Text style={styles.senderInfo}>{letter.senderPhone}</Text>
        )}

        <Text style={styles.date}>{date}</Text>

        {/* Recipient info */}
        {letter.recipientName && (
          <Text style={styles.recipientLine}>{letter.recipientName}</Text>
        )}
        {letter.recipientTitle && (
          <Text style={styles.recipientLine}>{letter.recipientTitle}</Text>
        )}
        {letter.company && (
          <Text style={styles.recipientLine}>{letter.company}</Text>
        )}
        {letter.companyAddress && (
          <Text style={styles.recipientLine}>{letter.companyAddress}</Text>
        )}

        {/* Greeting */}
        <Text style={styles.greeting}>
          {letter.greeting}{letter.recipientName ? ` ${letter.recipientName},` : letter.company ? ` ${letter.company} Team,` : " Hiring Manager,"}
        </Text>

        {/* Body */}
        {letter.bodyParagraphs.filter(Boolean).map((p, i) => (
          <Text key={i} style={styles.paragraph}>{p}</Text>
        ))}

        {/* Sign off */}
        <Text style={styles.signOff}>{letter.signOff},</Text>
        <Text style={styles.senderNameBlock}>
          {letter.senderName || "Your Name"}
        </Text>
      </Page>
    </Document>
  );
}

export async function exportCoverLetterPdf(letter: CoverLetter): Promise<Blob> {
  return await pdf(<CoverLetterPdfDocument letter={letter} />).toBlob();
}
