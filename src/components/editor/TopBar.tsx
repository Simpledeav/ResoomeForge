"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportMenu } from "./ExportMenu";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Palette,
  Eye,
  CheckCircle2,
  Loader2,
  Timer,
  CheckSquare,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface TopBarProps {
  onToggleDesign: () => void;
  onTogglePreview: () => void;
  designOpen: boolean;
  previewMode?: string;
  onToggleAts?: () => void;
  /** Optional ref to preview element for image export */
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export function TopBar({
  onToggleDesign,
  onTogglePreview,
  designOpen,
  previewMode = "split",
  onToggleAts,
  previewRef,
}: TopBarProps) {
  const currentResume = useResumeStore((s) => s.currentResume);
  const updateMeta = useResumeStore((s) => s.updateMeta);
  const undo = useResumeStore((s) => s.undo);
  const redo = useResumeStore((s) => s.redo);
  const isDirty = useResumeStore((s) => s.isDirty);
  const isSaving = useResumeStore((s) => s.isSaving);
  const lastSavedAt = useResumeStore((s) => s.lastSavedAt);
  const saveCurrentResume = useResumeStore((s) => s.saveCurrentResume);

  const [title, setTitle] = useState(currentResume.meta.name);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  // Sync title with store
  useEffect(() => {
    setTitle(currentResume.meta.name);
  }, [currentResume.meta.name]);

  // Track save status
  useEffect(() => {
    if (isSaving) {
      setSaveStatus("saving");
    } else if (isDirty) {
      setSaveStatus("unsaved");
    } else {
      setSaveStatus("saved");
    }
  }, [isDirty, isSaving]);

  // Autosave
  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      saveCurrentResume();
    }, 2000);
    return () => clearTimeout(timer);
  }, [isDirty, saveCurrentResume]);

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      updateMeta({ name: value });
    },
    [updateMeta],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        saveCurrentResume();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, saveCurrentResume]);

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-2 sm:px-3 py-1.5 gap-1 sm:gap-2">
      {/* Left: Back + Title */}
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="size-3.5 sm:size-3" />
          <span className="hidden sm:inline">Back</span>
        </Link>
        <div className="h-4 w-px bg-border shrink-0 hidden sm:block" />
        <Input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="h-7 w-28 sm:w-32 lg:w-64 border-0 bg-transparent px-0 text-sm font-medium text-foreground focus-visible:ring-0"
        />
        {/* Save status — icon only */}
        <div className="flex items-center gap-1 shrink-0">
          {saveStatus === "saving" && (
            <Loader2 className="size-3 animate-spin text-muted-foreground" />
          )}
          {saveStatus === "saved" && lastSavedAt && (
            <CheckCircle2 className="size-3 text-success" />
          )}
          {saveStatus === "unsaved" && (
            <Timer className="size-3 text-warning" />
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        {/* Undo/Redo — always icon-only */}
        <Button variant="ghost" size="icon-xs" onClick={undo} title="Undo (Cmd+Z)">
          <Undo2 className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon-xs" onClick={redo} title="Redo (Cmd+Shift+Z)">
          <Redo2 className="size-3.5" />
        </Button>

        <div className="h-4 w-px bg-border mx-0.5 hidden sm:block" />

        {/* ATS Check — hidden on mobile */}
        {onToggleAts && (
          <Button
            variant={previewMode === "ats" ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={onToggleAts}
            className="hidden sm:inline-flex"
            title="ATS Check"
          >
            <CheckSquare className="size-3.5" />
          </Button>
        )}

        {/* Design */}
        <Button
          variant={designOpen ? "secondary" : "ghost"}
          size="icon-sm"
          className="sm:size-7"
          onClick={onToggleDesign}
          title="Design"
        >
          <Palette className="size-3.5" />
        </Button>

        {/* Preview toggle — hidden on mobile */}
        <Button variant="ghost" size="icon-sm" onClick={onTogglePreview} className="hidden sm:inline-flex" title={previewMode === "preview" ? "Split view" : "Full preview"}>
          <Eye className="size-3.5" />
        </Button>

        {/* Export — uses ExportMenu which provides its own trigger button */}
        <ExportMenu previewRef={previewRef} />
      </div>
    </div>
  );
}
