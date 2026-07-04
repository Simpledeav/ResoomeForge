import type { CoverLetter } from "@/lib/schema/cover-letter";
import { exportCoverLetterPdf } from "./pdf";
import { exportCoverLetterDocx } from "./docx";
import { exportCoverLetterTxt } from "./txt";
import { downloadBlob, getSafeFilename } from "../json";

export type CoverLetterExportFormat = "pdf" | "docx" | "txt";

export interface CoverLetterExportOptions {
  format: CoverLetterExportFormat;
  letter: CoverLetter;
}

export async function exportCoverLetter(
  options: CoverLetterExportOptions,
): Promise<Blob> {
  const { format, letter } = options;

  switch (format) {
    case "pdf":
      return await exportCoverLetterPdf(letter);
    case "docx":
      return await exportCoverLetterDocx(letter);
    case "txt":
      return exportCoverLetterTxt(letter);
    default:
      throw new Error(`Unsupported cover letter export format: ${format}`);
  }
}

export async function downloadCoverLetter(
  options: CoverLetterExportOptions,
): Promise<void> {
  const { format, letter } = options;
  const blob = await exportCoverLetter(options);
  const filename = getSafeFilename(
    letter.meta.name,
    `cover-letter-${letter.meta.template}`,
    format,
  );
  downloadBlob(blob, filename);
}

export {
  exportCoverLetterPdf,
  exportCoverLetterDocx,
  exportCoverLetterTxt,
};
