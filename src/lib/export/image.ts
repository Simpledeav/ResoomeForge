import { toJpeg, toBlob } from "html-to-image";

export interface ImageExportOptions {
  /** Pixel ratio for high-DPI exports. 1 = standard, 2 = @2x, 3 = @3x */
  pixelRatio?: number;
  /** Background color, defaults to white */
  backgroundColor?: string;
  /** For JPEG: quality 0-1 */
  quality?: number;
}

const DEFAULT_OPTIONS: ImageExportOptions = {
  pixelRatio: 2,
  backgroundColor: "#ffffff",
  quality: 0.95,
};

/**
 * Capture a DOM element and export as PNG Blob
 */
export async function exportPng(
  element: HTMLElement,
  options: ImageExportOptions = {},
): Promise<Blob> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Use toBlob for direct blob output
  const blob = await toBlob(element, {
    pixelRatio: opts.pixelRatio,
    backgroundColor: opts.backgroundColor,
  });

  if (!blob) throw new Error("Failed to generate PNG blob");
  return blob;
}

/**
 * Capture a DOM element and export as JPEG Blob
 */
export async function exportJpeg(
  element: HTMLElement,
  options: ImageExportOptions = {},
): Promise<Blob> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const dataUrl = await toJpeg(element, {
    pixelRatio: opts.pixelRatio,
    backgroundColor: opts.backgroundColor,
    quality: opts.quality,
  });

  const response = await fetch(dataUrl);
  return await response.blob();
}


