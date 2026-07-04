import type { Resume } from "@/lib/schema";
import { ResumeSchema } from "@/lib/schema";

export function exportJson(resume: Resume): Blob {
  const data = JSON.stringify(resume, null, 2);
  return new Blob([data], { type: "application/json;charset=utf-8" });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getSafeFilename(
  name: string,
  template: string | undefined,
  ext: string,
): string {
  const safe = name
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return template
    ? `${safe || "resume"}-resume-${template}.${ext}`
    : `${safe || "resume"}-resume.${ext}`;
}

export function importJson(jsonString: string): Resume | null {
  try {
    const parsed = JSON.parse(jsonString);
    const result = ResumeSchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }
    console.error("Invalid resume JSON:", result.error);
    return null;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null;
  }
}
