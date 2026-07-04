import type { CoverLetter } from "@/lib/schema/cover-letter";

export function exportCoverLetterTxt(letter: CoverLetter): Blob {
  const lines: string[] = [];
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Sender
  if (letter.senderName) lines.push(letter.senderName);
  if (letter.senderTitle) lines.push(letter.senderTitle);
  if (letter.senderEmail) lines.push(letter.senderEmail);
  if (letter.senderPhone) lines.push(letter.senderPhone);
  lines.push("");

  // Date
  lines.push(date);
  lines.push("");

  // Recipient
  if (letter.recipientName) lines.push(letter.recipientName);
  if (letter.recipientTitle) lines.push(letter.recipientTitle);
  if (letter.company) lines.push(letter.company);
  if (letter.companyAddress) lines.push(letter.companyAddress);
  lines.push("");

  // Greeting
  const greetingText = letter.greeting +
    (letter.recipientName ? ` ${letter.recipientName},` :
     letter.company ? ` ${letter.company} Team,` :
     " Hiring Manager,");
  lines.push(greetingText);
  lines.push("");

  // Body
  letter.bodyParagraphs.filter(Boolean).forEach((p) => {
    lines.push(p);
    lines.push("");
  });

  // Sign off
  lines.push(`${letter.signOff},`);
  lines.push(letter.senderName || "Your Name");
  lines.push("");

  return new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
}
