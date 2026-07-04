import { z } from "zod";

// ============================================================
// COVER LETTER SCHEMA
// ============================================================

export const CoverLetterMetaSchema = z.object({
  id: z.string().default(""),
  name: z.string().max(200).default("Untitled Cover Letter"),
  template: z.string().default("modern"),       // template family for visual pairing
  color: z.string().default("#000000"),          // accent color (matched from resume)
  font: z.string().default("geist"),
  fontSize: z.enum(["small", "medium", "large"]).default("medium"),
  spacing: z.enum(["compact", "normal", "spacious"]).default("normal"),
  margin: z.enum(["small", "normal", "large"]).default("normal"),
  theme: z.enum(["light", "dark"]).default("light"),
  linkedResumeId: z.string().optional(),          // optional link to a resume
  createdAt: z.number().default(() => Date.now()),
  updatedAt: z.number().default(() => Date.now()),
});
export type CoverLetterMeta = z.infer<typeof CoverLetterMetaSchema>;

export const CoverLetterSchema = z.object({
  meta: CoverLetterMetaSchema,
  // Recipient
  recipientName: z.string().max(200).default(""),
  recipientTitle: z.string().max(200).default(""),
  company: z.string().max(200).default(""),
  companyAddress: z.string().max(500).default(""),
  // Content
  greeting: z.string().max(200).default("Dear"),
  bodyParagraphs: z.array(z.string().max(5000)).default(["", "", ""]),
  signOff: z.string().max(200).default("Sincerely"),
  // Sender
  senderName: z.string().max(200).default(""),
  senderTitle: z.string().max(200).default(""),
  senderEmail: z.string().email().or(z.literal("")).default(""),
  senderPhone: z.string().max(30).default(""),
});
export type CoverLetter = z.infer<typeof CoverLetterSchema>;

// ============================================================
// HELPERS
// ============================================================

export function createEmptyCoverLetter(): CoverLetter {
  return {
    meta: {
      ...CoverLetterMetaSchema.parse({}),
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    },
    recipientName: "",
    recipientTitle: "",
    company: "",
    companyAddress: "",
    greeting: "Dear",
    bodyParagraphs: ["", "", ""],
    signOff: "Sincerely",
    senderName: "",
    senderTitle: "",
    senderEmail: "",
    senderPhone: "",
  };
}
