"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Image,
  FileType,
  Braces,
  Download,
  Loader2,
  Upload,
} from "lucide-react";
import { useState, useRef } from "react";
import { useResumeStore } from "@/lib/store";
import { toast } from "sonner";
import { downloadResume } from "@/lib/export";
import { importJson } from "@/lib/export/json";
import type { ExportFormat } from "@/lib/export";


interface ExportMenuProps {
  children?: React.ReactNode;
  /** Optional ref to the preview DOM element for image export */
  previewRef?: React.RefObject<HTMLDivElement | null>;
  /** Controlled open state (from parent) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

export function ExportMenu({ children, previewRef, open, onOpenChange }: ExportMenuProps) {
  const currentResume = useResumeStore((s) => s.currentResume);
  const importResume = useResumeStore((s) => s.importResume);
  const [exporting, setExporting] = useState<ExportFormat | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Find the preview DOM element for image capture */
  const findPreviewElement = (): HTMLElement | null => {
    // Try the provided ref first
    if (previewRef?.current) {
      // Look for the scaled preview container inside
      const preview = previewRef.current.querySelector('[class*="shadow-lg"]') as HTMLElement | null;
      if (preview) return preview;
      return previewRef.current;
    }
    // Fallback: search the document for the preview container
    const candidates = document.querySelectorAll('[class*="shadow-lg"]');
    for (const el of candidates) {
      if (el.closest('[class*="preview"]') || el.closest('[class*="Preview"]') || el.parentElement?.closest('[class*="overflow-auto"]')) {
        return el as HTMLElement;
      }
    }
    return null;
  };

  const handleExport = async (format: ExportFormat) => {
    setExporting(format);

    try {
      const element = format === "png" || format === "jpg" ? findPreviewElement() : undefined;

      await downloadResume({
        format,
        resume: currentResume,
        element: element ?? undefined,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const label = format.toUpperCase();
      toast.success(`${label} exported successfully!`);
    } catch (error) {
      console.error(`Export ${format} failed:`, error);
      if (format === "png" || format === "jpg") {
        toast.error("Image export requires the preview pane to be visible. Try opening the editor first.");
      } else {
        toast.error(`${format.toUpperCase()} export failed. Please try again.`);
      }
    } finally {
      setExporting(null);
    }
  };

  const handleImportJson = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const resume = importJson(text);
      if (resume) {
        importResume(resume);
        toast.success(`Resume "${resume.meta.name}" imported successfully!`);
      } else {
        toast.error("Invalid resume file. Please ensure it's a valid JSON backup.");
      }
    } catch {
      toast.error("Failed to read file. Please try again.");
    }

    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelected}
        className="hidden"
      />
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger>
          {children || (
            <Button size="sm">
              <Download className="size-3.5 mr-1.5" />
              Export
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Export as</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExport("pdf")} disabled={exporting === "pdf"}>
            {exporting === "pdf" ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <FileText className="size-4 mr-2" />
            )}
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("docx")} disabled={exporting === "docx"}>
            {exporting === "docx" ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <FileType className="size-4 mr-2" />
            )}
            DOCX
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("png")} disabled={exporting === "png"}>
            {exporting === "png" ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <Image className="size-4 mr-2" />
            )}
            PNG Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("txt")} disabled={exporting === "txt"}>
            {exporting === "txt" ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <FileText className="size-4 mr-2" />
            )}
            Plain Text
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExport("json")} disabled={exporting === "json"}>
            {exporting === "json" ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <Braces className="size-4 mr-2" />
            )}
            JSON Backup
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleImportJson}>
            <Upload className="size-4 mr-2" />
            Import Backup
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
