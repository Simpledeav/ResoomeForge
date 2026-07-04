// Template registry
export { TEMPLATE_REGISTRY, getTemplateById, getTemplatesByCategory } from "./registry";

// ATS-Safe templates
export { Chronos } from "./ats-safe/Chronos";
export { Executive } from "./ats-safe/Executive";
export { Compact } from "./ats-safe/Compact";
export { Clean } from "./ats-safe/Clean";

// Modern templates
export { Minimal } from "./modern/Minimal";
export { Sidebar } from "./modern/Sidebar";
export { Split } from "./modern/Split";
export { Apex } from "./modern/Apex";

// Creative templates
export { Creative } from "./creative/Creative";
export { Bold } from "./creative/Bold";
export { Vibrant } from "./creative/Vibrant";
export { Element } from "./creative/Element";

// Shared utilities
export { Section, Divider as UIDivider } from "./shared/Section";
export {
  Heading,
  SectionBlock,
  BulletList,
  DateRange,
  ContactRow,
  ContactList,
  ProfilePhoto,
  Divider,
  SkillTag,
  SkillsDisplay,
  ExperienceCard,
  EducationCard,
  ProjectCard,
  CertificationCard,
  LanguageDisplay,
  SectionRenderer,
} from "./shared/TemplateBase";
export type { AccentConfig } from "./shared/TemplateBase";
export { formatMonthYear, formatDateRange, getFontFamily } from "./shared/types";
export type { TemplateProps } from "./shared/types";
export { SAMPLE_RESUME } from "./shared/sample-data";
