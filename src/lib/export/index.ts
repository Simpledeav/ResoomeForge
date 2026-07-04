import type { Resume } from "@/lib/schema";
import { exportPdf } from "./pdf";
import { exportDocx } from "./docx";
import { exportTxt } from "./txt";
import { exportJson, getSafeFilename, downloadBlob } from "./json";
import { exportPng, exportJpeg } from "./image";

export type ExportFormat = "pdf" | "docx" | "png" | "jpg" | "txt" | "json";

export interface ExportOptions {
  format: ExportFormat;
  resume: Resume;
  /** For PNG/JPG: DOM element to capture */
  element?: HTMLElement | null;
  /** For PNG/JPG: pixel ratio */
  pixelRatio?: 1 | 2 | 3;
  /** For PNG/JPG: background color */
  backgroundColor?: string;
}

/**
 * Export a resume in the specified format.
 * Returns a Blob ready for download.
 */
export async function exportResume(options: ExportOptions): Promise<Blob> {
  const { format, resume, element, pixelRatio, backgroundColor } = options;

  switch (format) {
    case "pdf": {
      return await exportPdf(resume);
    }

    case "docx": {
      return await exportDocx(resume);
    }

    case "txt": {
      return exportTxt(resume);
    }

    case "json": {
      return exportJson(resume);
    }

    case "png": {
      if (!element) throw new Error("DOM element required for PNG export");
      return await exportPng(element, { pixelRatio, backgroundColor });
    }

    case "jpg": {
      if (!element) throw new Error("DOM element required for JPG export");
      return await exportJpeg(element, { pixelRatio, backgroundColor });
    }

    default: {
      throw new Error(`Unsupported export format: ${format}`);
    }
  }
}

/**
 * Export and download a resume.
 * Handles blob creation, filename generation, and download triggering.
 */
export async function downloadResume(
  options: ExportOptions,
): Promise<void> {
  const { format, resume } = options;
  const ext = format === "jpg" ? "jpg" : format;
  const blob = await exportResume(options);
  const filename = getSafeFilename(resume.meta.name, resume.meta.template, ext);
  downloadBlob(blob, filename);
}

export {
  exportPdf,
  exportDocx,
  exportTxt,
  exportJson,
  exportPng,
  exportJpeg,
  getSafeFilename,
  downloadBlob,
};
