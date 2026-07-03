"use client";

import Link from "next/link";
import { ArrowLeft, Settings, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem-200px)] flex-col">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3" />
            Back
          </Link>
          <span className="text-xs font-medium text-foreground">
            Untitled Resume
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Settings className="size-3.5" />
            <span className="hidden sm:inline ml-1">Style</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Eye className="size-3.5" />
            <span className="hidden sm:inline ml-1">Preview</span>
          </Button>
          <Button size="sm">
            <Download className="size-3.5" />
            <span className="hidden sm:inline ml-1">Export</span>
          </Button>
        </div>
      </div>

      {/* Editor content - placeholder */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden w-72 border-r border-border p-4 md:block">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="caption text-muted-foreground">Sections</span>
              <div className="mt-2 flex flex-col gap-1">
                {[
                  "Personal Info",
                  "Summary",
                  "Experience",
                  "Education",
                  "Skills",
                  "Certifications",
                  "Projects",
                ].map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-border" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main editor area */}
        <div className="flex flex-1 items-center justify-center bg-muted/30 p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-xl border-2 border-dashed border-border p-8">
              <p className="text-sm text-muted-foreground">
                Your editor will appear here.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Add sections and build your resume in the sidebar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
