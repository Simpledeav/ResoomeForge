"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  ArrowRight,
  Trash2,
  Copy,
  Clock,
  AlertTriangle,
  Loader2,
  PencilLine,
  Check,
  X,
  Download,
  FileDown,
  FileType,
  Braces,
  Upload,
  CloudOff,
  XCircle,
  FileSignature,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useResumeStore } from "@/lib/store";
import { saveResume as dbSaveResume } from "@/lib/db";
import { TEMPLATE_REGISTRY } from "@/components/templates/registry";
import type { Resume } from "@/lib/schema";
import { downloadResume } from "@/lib/export";
import { importJson } from "@/lib/export/json";
import { toast } from "sonner";

// ============================================================
// CONSTANTS
// ============================================================

const SOFT_LIMIT_BANNER_KEY = "resumeforge_soft_limit_banner_dismissed";
const SOFT_LIMIT_COUNT = 3;

// ============================================================
// HELPERS
// ============================================================

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function getTemplateName(templateId: string): string {
  const tpl = TEMPLATE_REGISTRY.find((t) => t.id === templateId);
  return tpl?.name ?? templateId;
}

function getPreviewColor(templateId: string): string {
  const category = TEMPLATE_REGISTRY.find((t) => t.id === templateId)?.category ?? "modern";
  const colors: Record<string, string> = {
    modern: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
    creative: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900",
    "ats-safe": "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
  };
  return colors[category] ?? colors.modern;
}

function getTemplateInitials(templateId: string): string {
  const tpl = TEMPLATE_REGISTRY.find((t) => t.id === templateId);
  return tpl?.name.charAt(0).toUpperCase() ?? "R";
}

// ============================================================
// SOFT-LIMIT BANNER
// ============================================================

function SoftLimitBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm">
      <CloudOff className="size-5 text-accent shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">
          Create a free account to save unlimited resumes and sync across devices
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Your resumes are currently stored locally. Sign up for free cloud backup,
          cross-device sync, and AI-powered writing assistance.
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="xs"
            className="h-6 text-xs px-2"
            onClick={onDismiss}
          >
            Get started free
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="h-6 text-xs px-2"
            onClick={onDismiss}
          >
            <XCircle className="size-3 mr-1" />
            Dismiss
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={onDismiss}
        className="shrink-0 -mr-1 -mt-1"
        aria-label="Dismiss banner"
      >
        <X className="size-3.5" />
      </Button>
    </div>
  );
}

// ============================================================
// DELETE RESUME DIALOG
// ============================================================

function DeleteResumeDialog({
  resume,
  onDelete,
}: {
  resume: Resume;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(resume.meta.id);
    setDeleting(false);
    setOpen(false);
    toast.success(`"${resume.meta.name}" deleted`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-error hover:bg-error/5 transition-colors w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Trash2 className="size-3" />
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-error" />
            Delete Resume
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {resume.meta.name}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <Loader2 className="size-3.5 mr-1 animate-spin" />
            ) : (
              <Trash2 className="size-3.5 mr-1" />
            )}
            Delete Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ============================================================
// RENAMABLE TITLE
// ============================================================

function RenamableTitle({
  resume,
  onRename,
}: {
  resume: Resume;
  onRename: (id: string, name: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(resume.meta.name);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(resume.meta.name);
  }, [resume.meta.name]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === resume.meta.name) {
      setValue(resume.meta.name);
      setEditing(false);
      return;
    }
    setSaving(true);
    await onRename(resume.meta.id, trimmed);
    setSaving(false);
    setEditing(false);
    toast.success("Resume renamed");
  }, [value, resume.meta.id, resume.meta.name, onRename]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setValue(resume.meta.name);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="h-6 text-sm font-semibold px-1 py-0 border-foreground/30"
        />
        {saving ? (
          <Loader2 className="size-3 animate-spin shrink-0" />
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              className="p-0.5 rounded hover:bg-muted shrink-0"
              aria-label="Save name"
            >
              <Check className="size-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setValue(resume.meta.name);
                setEditing(false);
              }}
              className="p-0.5 rounded hover:bg-muted shrink-0"
              aria-label="Cancel rename"
            >
              <X className="size-3" />
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
      className="group/title flex items-center gap-1 text-left"
      aria-label={`Rename "${resume.meta.name}"`}
    >
      <h3 className="text-sm font-semibold text-foreground truncate">
        {resume.meta.name || "Untitled Resume"}
      </h3>
      <PencilLine className="size-3 text-muted-foreground opacity-0 group-hover/title:opacity-100 transition-opacity shrink-0" />
    </button>
  );
}

// ============================================================
// PER-CARD EXPORT MENU
// ============================================================

function CardExportMenu({ resume }: { resume: Resume }) {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (format: "pdf" | "docx" | "txt" | "json") => {
    setExporting(format);
    try {
      await downloadResume({ format, resume });
      toast.success(`${format.toUpperCase()} exported`);
    } catch {
      toast.error(`${format.toUpperCase()} export failed`);
    } finally {
      setExporting(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Download className="size-3" />
        Export
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40" side="right">
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleExport("pdf");
          }}
          disabled={exporting === "pdf"}
        >
          {exporting === "pdf" ? (
            <Loader2 className="size-3.5 mr-2 animate-spin" />
          ) : (
            <FileDown className="size-3.5 mr-2" />
          )}
          PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleExport("docx");
          }}
          disabled={exporting === "docx"}
        >
          {exporting === "docx" ? (
            <Loader2 className="size-3.5 mr-2 animate-spin" />
          ) : (
            <FileType className="size-3.5 mr-2" />
          )}
          DOCX
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleExport("txt");
          }}
          disabled={exporting === "txt"}
        >
          {exporting === "txt" ? (
            <Loader2 className="size-3.5 mr-2 animate-spin" />
          ) : (
            <FileText className="size-3.5 mr-2" />
          )}
          Plain Text
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleExport("json");
          }}
          disabled={exporting === "json"}
        >
          {exporting === "json" ? (
            <Loader2 className="size-3.5 mr-2 animate-spin" />
          ) : (
            <Braces className="size-3.5 mr-2" />
          )}
          JSON Backup
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================
// IMPORT BACKUP
// ============================================================

function ImportBackupButton({ onImported }: { onImported: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const resume = importJson(text);
      if (resume) {
        resume.meta.id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        resume.meta.createdAt = Date.now();
        resume.meta.updatedAt = Date.now();
        await dbSaveResume(resume);
        toast.success(`"${resume.meta.name}" imported!`);
        onImported();
      } else {
        toast.error("Invalid resume file");
      }
    } catch {
      toast.error("Failed to read file");
    }
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFile}
        className="hidden"
      />
      <Button variant="outline" onClick={handleClick} className="text-xs">
        <Upload className="size-3.5 mr-1.5" />
        Import Backup
      </Button>
    </>
  );
}

// ============================================================
// MAIN DASHBOARD PAGE
// ============================================================

export default function DashboardPage() {
  const router = useRouter();
  const resumeList = useResumeStore((s) => s.resumeList);
  const isLoadingList = useResumeStore((s) => s.isLoadingList);
  const loadResumeList = useResumeStore((s) => s.loadResumeList);
  const loadResume = useResumeStore((s) => s.loadResume);
  const deleteResume = useResumeStore((s) => s.deleteResume);
  const duplicateResume = useResumeStore((s) => s.duplicateResume);
  const renameResume = useResumeStore((s) => s.renameResume);

  const [bannerDismissed, setBannerDismissed] = useState(true);

  useEffect(() => {
    loadResumeList();
  }, [loadResumeList]);

  // Check soft-limit banner state
  useEffect(() => {
    const dismissed = localStorage.getItem(SOFT_LIMIT_BANNER_KEY) === "true";
    setBannerDismissed(dismissed);
  }, []);

  const handleDismissBanner = () => {
    localStorage.setItem(SOFT_LIMIT_BANNER_KEY, "true");
    setBannerDismissed(true);
  };

  const handleEdit = async (id: string) => {
    await loadResume(id);
    router.push("/editor");
  };

  const handleDelete = async (id: string) => {
    await deleteResume(id);
  };

  const handleDuplicate = async (id: string) => {
    await duplicateResume(id);
  };

  const handleRefresh = () => {
    loadResumeList();
  };

  // Sort: most recently updated first
  const sorted = [...resumeList].sort(
    (a, b) => b.meta.updatedAt - a.meta.updatedAt,
  );

  // Check if we should show the banner: >= 3 resumes AND not dismissed
  const showBanner =
    sorted.length >= SOFT_LIMIT_COUNT && !bannerDismissed;

  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <h1 className="h1 text-foreground">My Resumes</h1>
            <p className="body-lg text-muted-foreground">
              {resumeList.length > 0
                ? `${resumeList.length} resume${resumeList.length !== 1 ? "s" : ""} saved locally on this device.`
                : "Create, edit, and manage your resumes — all in one place."}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <ImportBackupButton onImported={handleRefresh} />
            <Link href="/editor">
              <Button className="group">
                <Plus className="mr-2 size-4" />
                New Resume
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Soft-limit banner */}
        {showBanner && (
          <div className="mt-6">
            <SoftLimitBanner onDismiss={handleDismissBanner} />
          </div>
        )}

        {/* Resume List */}
        {isLoadingList ? (
          <div className="mt-12 flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading resumes...</p>
            </div>
          </div>
        ) : sorted.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((resume) => (
              <div
                key={resume.meta.id}
                className="group relative flex flex-col rounded-xl border border-border bg-background overflow-hidden transition-all hover:shadow-md hover:border-foreground/20 cursor-pointer"
                onClick={() => handleEdit(resume.meta.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleEdit(resume.meta.id);
                  }
                }}
                aria-label={`Edit ${resume.meta.name || "resume"}`}
              >
                {/* Preview thumbnail */}
                <div
                  className={`h-28 flex items-center justify-center ${getPreviewColor(resume.meta.template)}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-10 w-8 items-center justify-center rounded border border-border/50 bg-background/80 text-xs font-bold text-foreground/70">
                      {getTemplateInitials(resume.meta.template)}
                    </div>
                    <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                      {getTemplateName(resume.meta.template)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <RenamableTitle
                        resume={resume}
                        onRename={renameResume}
                      />
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[9px] capitalize mt-0.5"
                    >
                      {resume.meta.template}
                    </Badge>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {formatRelativeTime(resume.meta.updatedAt)}
                    </span>
                    <span>
                      {resume.experience.length} exp ·{" "}
                      {resume.education.length} edu ·{" "}
                      {resume.skills.flatMap((s) => s.skills).filter(Boolean).length} skills
                    </span>
                  </div>
                </div>

                {/* Actions overlay (appears on hover/focus) */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                  {/* Export quick-menu */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <CardExportMenu resume={resume} />
                  </div>

                  {/* Duplicate */}
                  <button
                    className="flex items-center gap-1 rounded-md bg-background/90 backdrop-blur-sm border border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicate(resume.meta.id);
                    }}
                    title="Duplicate"
                    aria-label="Duplicate resume"
                  >
                    <Copy className="size-3" />
                    Duplicate
                  </button>

                  {/* Delete */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <DeleteResumeDialog
                      resume={resume}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="mt-12 flex flex-col items-center gap-6 rounded-xl border border-border bg-muted/30 px-6 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background">
              <FileText className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                No resumes yet
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                Your resumes will appear here. Create your first one — it takes
                less than 10 seconds.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/editor">
                <Button className="group">
                  <Plus className="mr-2 size-4" />
                  Create your first resume
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <ImportBackupButton onImported={handleRefresh} />
            </div>
          </div>
        )}

        {/* Quick tips (only show when there are no resumes) */}
        {sorted.length === 0 && !isLoadingList && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Start from scratch",
                desc: "Choose a template and build your resume from the ground up.",
              },
              {
                title: "Import existing",
                desc: "Upload a JSON backup and we'll restore your resume.",
              },
              {
                title: "Export in seconds",
                desc: "Download as PDF, DOCX, TXT, or JSON — unlimited.",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="rounded-lg border border-border p-4"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {tip.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Cover Letters Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="h2 text-foreground">Cover Letters</h2>
              <p className="body-lg text-muted-foreground">
                Create a cover letter that pairs with your resume.
              </p>
            </div>
            <Link href="/cover-letter">
              <Button variant="outline" className="group shrink-0">
                <FileSignature className="mr-2 size-4" />
                New Cover Letter
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
          <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/30 px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background">
              <FileSignature className="size-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                Pair a cover letter with any resume
              </p>
              <p className="text-xs text-muted-foreground max-w-sm">
                Cover letters use the same template styling as your resume —
                consistent branding, one click export.
              </p>
            </div>
            <Link href="/cover-letter">
              <Button variant="outline" size="sm">
                <Plus className="mr-1.5 size-3.5" />
                Create your first cover letter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
