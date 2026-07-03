import { z } from "zod";

// ============================================================
// ENUMS & CONSTANTS
// ============================================================

export const ProficiencyLevel = z.enum([
  "native",
  "fluent",
  "advanced",
  "intermediate",
  "basic",
]);
export type ProficiencyLevel = z.infer<typeof ProficiencyLevel>;

export const MonthYear = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(1950).max(2100),
});
export type MonthYear = z.infer<typeof MonthYear>;

// ============================================================
// SECTION SCHEMAS
// ============================================================

export const PersonalInfoSchema = z.object({
  firstName: z.string().max(100).default(""),
  lastName: z.string().max(100).default(""),
  email: z.string().email().or(z.literal("")).default(""),
  phone: z.string().max(30).default(""),
  location: z.string().max(200).default(""),
  title: z.string().max(200).default(""), // Professional headline
  summary: z.string().max(2000).default(""),
  website: z.string().url().or(z.literal("")).default(""),
  linkedin: z.string().max(200).default(""),
  github: z.string().max(200).default(""),
  photo: z.string().max(500).default(""), // base64 data URL
});
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string().max(200).default(""),
  position: z.string().max(200).default(""),
  location: z.string().max(200).default(""),
  startDate: MonthYear,
  endDate: MonthYear.optional(),
  current: z.boolean().default(false),
  description: z.string().max(1000).default(""),
  bullets: z.array(z.string().max(500)).default([""]),
});
export type Experience = z.infer<typeof ExperienceSchema>;

export const EducationSchema = z.object({
  id: z.string(),
  school: z.string().max(200).default(""),
  degree: z.string().max(200).default(""),
  field: z.string().max(200).default(""),
  location: z.string().max(200).default(""),
  startDate: MonthYear,
  endDate: MonthYear.optional(),
  current: z.boolean().default(false),
  gpa: z.string().max(10).default(""),
  honors: z.string().max(500).default(""),
});
export type Education = z.infer<typeof EducationSchema>;

export const SkillSchema = z.object({
  id: z.string(),
  category: z.string().max(100).default(""),
  skills: z.array(z.string().max(100)).default([""]),
  level: z.number().int().min(1).max(5).optional(), // optional skill rating
});
export type Skill = z.infer<typeof SkillSchema>;

export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().max(200).default(""),
  issuer: z.string().max(200).default(""),
  date: MonthYear.optional(),
  url: z.string().url().or(z.literal("")).default(""),
  description: z.string().max(500).default(""),
});
export type Certification = z.infer<typeof CertificationSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().max(200).default(""),
  description: z.string().max(1000).default(""),
  url: z.string().url().or(z.literal("")).default(""),
  technologies: z.array(z.string().max(100)).default([""]),
  startDate: MonthYear.optional(),
  endDate: MonthYear.optional(),
  current: z.boolean().default(false),
});
export type Project = z.infer<typeof ProjectSchema>;

export const LanguageSchema = z.object({
  id: z.string(),
  name: z.string().max(100).default(""),
  proficiency: ProficiencyLevel.default("intermediate"),
});
export type Language = z.infer<typeof LanguageSchema>;

export const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().max(200).default(""),
  company: z.string().max(200).default(""),
  email: z.string().email().or(z.literal("")).default(""),
  phone: z.string().max(30).default(""),
});
export type Reference = z.infer<typeof ReferenceSchema>;

export const CustomSectionItemSchema = z.object({
  id: z.string(),
  title: z.string().max(200).default(""),
  subtitle: z.string().max(200).default(""),
  date: z.string().max(100).default(""),
  description: z.string().max(2000).default(""),
});
export type CustomSectionItem = z.infer<typeof CustomSectionItemSchema>;

export const CustomSectionSchema = z.object({
  id: z.string(),
  title: z.string().max(200).default(""),
  items: z.array(CustomSectionItemSchema).default([]),
});
export type CustomSection = z.infer<typeof CustomSectionSchema>;

// ============================================================
// RESUME (FULL DOCUMENT)
// ============================================================

export const ResumeMetaSchema = z.object({
  id: z.string().default(""),
  name: z.string().max(200).default("Untitled Resume"),
  template: z.string().default("chronos"),
  color: z.string().default("#000000"),
  font: z.string().default("geist"),
  fontSize: z.enum(["small", "medium", "large"]).default("medium"),
  spacing: z.enum(["compact", "normal", "spacious"]).default("normal"),
  margin: z.enum(["small", "normal", "large"]).default("normal"),
  theme: z.enum(["light", "dark"]).default("light"),
  sectionOrder: z.array(z.string()).default([
    "personalInfo",
    "summary",
    "experience",
    "education",
    "skills",
    "certifications",
    "projects",
    "languages",
    "references",
    "customSections",
  ]),
  createdAt: z.number().default(() => Date.now()),
  updatedAt: z.number().default(() => Date.now()),
});
export type ResumeMeta = z.infer<typeof ResumeMetaSchema>;

export const ResumeSchema = z.object({
  meta: ResumeMetaSchema,
  personalInfo: PersonalInfoSchema.default(PersonalInfoSchema.parse({})),
  summary: z.string().max(2000).default(""),
  experience: z.array(ExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  certifications: z.array(CertificationSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  languages: z.array(LanguageSchema).default([]),
  references: z.array(ReferenceSchema).default([]),
  customSections: z.array(CustomSectionSchema).default([]),
});
export type Resume = z.infer<typeof ResumeSchema>;

// ============================================================
// SECTION VISIBILITY CONFIG
// ============================================================

export const SectionVisibilitySchema = z.record(z.string(), z.boolean()).default({
  personalInfo: true,
  summary: true,
  experience: true,
  education: true,
  skills: true,
  certifications: true,
  projects: true,
  languages: true,
  references: false,
  customSections: true,
});
export type SectionVisibility = z.infer<typeof SectionVisibilitySchema>;

// ============================================================
// HELPER: GENERATE EMPTY RESUME
// ============================================================

export function createEmptyResume(): Resume {
  return {
    meta: {
      ...ResumeMetaSchema.parse({}),
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    },
    personalInfo: PersonalInfoSchema.parse({}),
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
    references: [],
    customSections: [],
  };
}
