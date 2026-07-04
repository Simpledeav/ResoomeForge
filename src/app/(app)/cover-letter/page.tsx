"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Loader2,
  Plus,
  Trash2,
  Sparkles,
  FileText,
  Eye,
  CheckCircle2,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCoverLetterStore } from "@/lib/store/cover-letter";
import { useResumeStore } from "@/lib/store";
import { CoverLetterPreview } from "@/components/cover-letter/CoverLetterPreview";
import { downloadCoverLetter } from "@/lib/export/cover-letter";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ExportFormat = "pdf" | "docx" | "txt";

export default function CoverLetterEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const currentLetter = useCoverLetterStore((s) => s.currentLetter);
  const isDirty = useCoverLetterStore((s) => s.isDirty);
  const isSaving = useCoverLetterStore((s) => s.isSaving);
  const lastSavedAt = useCoverLetterStore((s) => s.lastSavedAt);
  const newLetter = useCoverLetterStore((s) => s.newLetter);
  const saveCurrentLetter = useCoverLetterStore((s) => s.saveCurrentLetter);
  const loadLetter = useCoverLetterStore((s) => s.loadLetter);
  const linkToResume = useCoverLetterStore((s) => s.linkToResume);
  const updateMeta = useCoverLetterStore((s) => s.updateMeta);
  const updateRecipient = useCoverLetterStore((s) => s.updateRecipient);
  const updateGreeting = useCoverLetterStore((s) => s.updateGreeting);
  const updateBodyParagraph = useCoverLetterStore((s) => s.updateBodyParagraph);
  const addBodyParagraph = useCoverLetterStore((s) => s.addBodyParagraph);
  const removeBodyParagraph = useCoverLetterStore((s) => s.removeBodyParagraph);
  const updateSignOff = useCoverLetterStore((s) => s.updateSignOff);
  const updateSender = useCoverLetterStore((s) => s.updateSender);

  const resumeList = useResumeStore((s) => s.resumeList);
  const loadResumeList = useResumeStore((s) => s.loadResumeList);

  const [exporting, setExporting] = useState<ExportFormat | null>(null);
  const [title, setTitle] = useState(currentLetter.meta.name);
  const [showPreview, setShowPreview] = useState(true);
  const [generating, setGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Init
  useEffect(() => {
    loadResumeList();
    if (resumeId) {
      linkToResume(resumeId);
    }
  }, [resumeId, linkToResume, loadResumeList]);

  // Autosave
  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      saveCurrentLetter();
    }, 2000);
    return () => clearTimeout(timer);
  }, [isDirty, saveCurrentLetter]);

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
      updateMeta({ name: value });
    },
    [updateMeta],
  );

  const handleExport = async (format: ExportFormat) => {
    setExporting(format);
    try {
      await downloadCoverLetter({ format, letter: currentLetter });
      toast.success(`${format.toUpperCase()} exported`);
    } catch {
      toast.error(`${format.toUpperCase()} export failed`);
    } finally {
      setExporting(null);
    }
  };

  const handleGenerateFromResume = async () => {
    const linkedId = currentLetter.meta.linkedResumeId;
    if (!linkedId) {
      toast.error("Link a resume first to generate a draft");
      return;
    }
    const resume = resumeList.find((r) => r.meta.id === linkedId);
    if (!resume) {
      toast.error("Linked resume not found");
      return;
    }
    setGenerating(true);

    // Generate draft from resume data
    const name = resume.personalInfo.firstName
      ? `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`
      : "";
    const latestExp = resume.experience[0];
    const skills = resume.skills.flatMap((s) => s.skills).filter(Boolean).slice(0, 5);

    // Auto-fill sender info
    updateSender({
      senderName: name,
      senderEmail: resume.personalInfo.email,
      senderPhone: resume.personalInfo.phone,
    });

    // Auto-fill greeting
    updateGreeting("Dear");

    // Build a draft body
    const bodyIntro = latestExp
      ? `I am writing to express my strong interest in the ${latestExp.position} position at your company. With my background in ${latestExp.position} at ${latestExp.company || "a leading organization"}, I am confident that my skills and experience make me a strong candidate for this role.`
      : `I am writing to express my interest in the position at your company. My background and qualifications align well with what you are looking for in a candidate.`;

    const bodySkills = skills.length > 0
      ? `My expertise includes ${skills.slice(0, 3).join(", ")}${skills.length > 3 ? `, and more` : ""}. I have consistently delivered results through a combination of technical skill and strategic thinking.`
      : "";

    const bodyClosing = `I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to the success of your team. Thank you for considering my application.`;

    updateBodyParagraph(0, bodyIntro);
    if (bodySkills) updateBodyParagraph(1, bodySkills);
    updateBodyParagraph(2, bodyClosing);

    updateSignOff("Sincerely");
    setGenerating(false);
    toast.success("Draft generated from your resume!");
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-4 py-2">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="size-3" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <Input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="h-7 w-44 border-0 bg-transparent px-0 text-sm font-medium text-foreground focus-visible:ring-0 sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Save status */}
          <div className="flex items-center gap-1 mr-2">
            {isSaving && (
              <>
                <Loader2 className="size-3 animate-spin text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground hidden sm:inline">
                  Saving...
                </span>
              </>
            )}
            {!isSaving && lastSavedAt && (
              <>
                <CheckCircle2 className="size-3 text-success" />
                <span className="text-[10px] text-muted-foreground hidden sm:inline">
                  Saved {formatTime(lastSavedAt)}
                </span>
              </>
            )}
            {!isSaving && isDirty && (
              <>
                <Timer className="size-3 text-warning" />
                <span className="text-[10px] text-muted-foreground hidden sm:inline">
                  Unsaved
                </span>
              </>
            )}
          </div>

          {/* AI Assistant Coming Soon */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border/50 px-2.5 py-1 text-[9px] text-muted-foreground mr-1">
            <svg className="size-2.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            AI
            <span className="text-[7px] uppercase tracking-wider text-accent font-medium">Soon</span>
          </div>

          {/* Preview toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="hidden sm:inline-flex"
          >
            <Eye className="size-3.5 mr-1" />
            {showPreview ? "Hide" : "Preview"}
          </Button>

          {/* Export */}
          <div className="flex gap-1">
            {(["pdf", "docx", "txt"] as ExportFormat[]).map((fmt) => (
              <Button
                key={fmt}
                variant="outline"
                size="sm"
                onClick={() => handleExport(fmt)}
                disabled={exporting === fmt}
              >
                {exporting === fmt ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <Download className="size-3" />
                )}
                <span className="hidden sm:inline ml-1 uppercase">
                  {fmt}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <div
          className={cn(
            "overflow-y-auto border-r border-border",
            showPreview ? "w-[420px]" : "flex-1 max-w-xl mx-auto",
          )}
        >
          <div className="p-4 flex flex-col gap-6">
            {/* Link to Resume */}
            <div className="flex flex-col gap-2">
              <Label>Linked Resume</Label>
              <Select
                value={currentLetter.meta.linkedResumeId || ""}
                onValueChange={(val) => linkToResume(val || undefined!)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a resume (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {resumeList.map((r) => (
                    <SelectItem key={r.meta.id} value={r.meta.id}>
                      {r.meta.name || "Untitled"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate draft */}
            {currentLetter.meta.linkedResumeId && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerateFromResume}
                disabled={generating}
              >
                {generating ? (
                  <Loader2 className="size-3.5 mr-1 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5 mr-1" />
                )}
                Generate draft from resume
              </Button>
            )}

            {/* Recipient */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Recipient
              </h3>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Recipient name"
                  value={currentLetter.recipientName}
                  onChange={(e) => updateRecipient({ recipientName: e.target.value })}
                />
                <Input
                  placeholder="Recipient title"
                  value={currentLetter.recipientTitle}
                  onChange={(e) => updateRecipient({ recipientTitle: e.target.value })}
                />
                <Input
                  placeholder="Company name"
                  value={currentLetter.company}
                  onChange={(e) => updateRecipient({ company: e.target.value })}
                />
                <Input
                  placeholder="Company address"
                  value={currentLetter.companyAddress}
                  onChange={(e) => updateRecipient({ companyAddress: e.target.value })}
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Greeting */}
            <div className="flex flex-col gap-2">
              <Label>Greeting</Label>
              <Input
                value={currentLetter.greeting}
                onChange={(e) => updateGreeting(e.target.value)}
              />
              <p className="text-[10px] text-muted-foreground">
                Preview: {currentLetter.greeting}
                {currentLetter.recipientName
                  ? ` ${currentLetter.recipientName},`
                  : currentLetter.company
                    ? ` ${currentLetter.company} Team,`
                    : " Hiring Manager,"}
              </p>
            </div>

            <div className="h-px bg-border" />

            {/* Body paragraphs */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Body
              </h3>
              {currentLetter.bodyParagraphs.map((p, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      Paragraph {i + 1}
                    </span>
                    {currentLetter.bodyParagraphs.length > 1 && (
                      <button
                        onClick={() => removeBodyParagraph(i)}
                        className="p-1 rounded text-muted-foreground hover:text-error transition-colors"
                        aria-label="Remove paragraph"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    )}
                  </div>
                  <Textarea
                    value={p}
                    onChange={(e) => updateBodyParagraph(i, e.target.value)}
                    placeholder="Write your paragraph here..."
                    rows={4}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addBodyParagraph}
                className="self-start"
              >
                <Plus className="size-3 mr-1" />
                Add paragraph
              </Button>
            </div>

            <div className="h-px bg-border" />

            {/* Sign off */}
            <div className="flex flex-col gap-2">
              <Label>Sign-off</Label>
              <Input
                value={currentLetter.signOff}
                onChange={(e) => updateSignOff(e.target.value)}
              />
            </div>

            <div className="h-px bg-border" />

            {/* Sender */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Sender
              </h3>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Your name"
                  value={currentLetter.senderName}
                  onChange={(e) => updateSender({ senderName: e.target.value })}
                />
                <Input
                  placeholder="Your title"
                  value={currentLetter.senderTitle}
                  onChange={(e) => updateSender({ senderTitle: e.target.value })}
                />
                <Input
                  placeholder="Your email"
                  value={currentLetter.senderEmail}
                  onChange={(e) => updateSender({ senderEmail: e.target.value })}
                />
                <Input
                  placeholder="Your phone"
                  value={currentLetter.senderPhone}
                  onChange={(e) => updateSender({ senderPhone: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        {showPreview && (
          <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden" ref={previewRef}>
            <div className="flex items-center justify-between border-b border-border px-4 py-1.5 bg-background/80">
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                Preview
              </span>
              <span className="text-[9px] text-muted-foreground capitalize">
                {currentLetter.meta.template}
              </span>
            </div>
            <div className="flex-1 overflow-auto flex items-start justify-center p-6">
              <div className="bg-background shadow-lg ring-1 ring-foreground/5 w-full max-w-[816px]">
                <CoverLetterPreview letter={currentLetter} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
