import {
  Document,
  Paragraph,
  TextRun,
  Packer,
  AlignmentType,
  BorderStyle,
} from "docx";
import type { CoverLetter } from "@/lib/schema/cover-letter";

export async function exportCoverLetterDocx(letter: CoverLetter): Promise<Blob> {
  const children: Paragraph[] = [];
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Sender info block
  if (letter.senderName) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.senderName, bold: true, size: 22 })],
        spacing: { after: 20 },
      }),
    );
  }
  if (letter.senderTitle) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.senderTitle, size: 18, color: "555555" })],
        spacing: { after: 20 },
      }),
    );
  }
  if (letter.senderEmail) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.senderEmail, size: 16, color: "555555" })],
        spacing: { after: 20 },
      }),
    );
  }
  if (letter.senderPhone) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.senderPhone, size: 16, color: "555555" })],
        spacing: { after: 20 },
      }),
    );
  }

  // Date
  children.push(
    new Paragraph({
      children: [new TextRun({ text: date, size: 16, color: "666666" })],
      spacing: { after: 200 },
    }),
  );

  // Recipient
  if (letter.recipientName) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.recipientName, size: 16 })],
        spacing: { after: 20 },
      }),
    );
  }
  if (letter.recipientTitle) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.recipientTitle, size: 16, color: "555555" })],
        spacing: { after: 20 },
      }),
    );
  }
  if (letter.company) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.company, size: 16 })],
        spacing: { after: 20 },
      }),
    );
  }
  if (letter.companyAddress) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: letter.companyAddress, size: 16, color: "555555" })],
        spacing: { after: 200 },
      }),
    );
  }

  // Greeting
  const greetingText = letter.greeting +
    (letter.recipientName ? ` ${letter.recipientName},` :
     letter.company ? ` ${letter.company} Team,` :
     " Hiring Manager,");

  children.push(
    new Paragraph({
      children: [new TextRun({ text: greetingText, size: 18 })],
      spacing: { after: 120 },
    }),
  );

  // Body paragraphs
  letter.bodyParagraphs.filter(Boolean).forEach((p) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: p, size: 18 })],
        spacing: { after: 120 },
        alignment: AlignmentType.JUSTIFIED,
      }),
    );
  });

  // Sign off
  children.push(
    new Paragraph({
      children: [new TextRun({ text: `${letter.signOff},`, size: 18 })],
      spacing: { before: 200, after: 40 },
    }),
  );
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: letter.senderName || "Your Name", bold: true, size: 18 }),
      ],
      spacing: { after: 200 },
    }),
  );

  const doc = new Document({
    sections: [{ children }],
  });

  return await Packer.toBlob(doc);
}
