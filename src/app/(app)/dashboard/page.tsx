"use client";

import Link from "next/link";
import { FileText, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="h1 text-foreground">My Resumes</h1>
              <p className="body-lg text-muted-foreground">
                Create, edit, and manage your resumes — all in one place.
              </p>
            </div>
            <Link href="/editor">
              <Button className="group">
                <Plus className="mr-2 size-4" />
                New Resume
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Empty state */}
          <div className="mt-8 flex flex-col items-center gap-6 rounded-xl border border-border bg-muted/30 px-6 py-20 text-center">
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
            <Link href="/editor">
              <Button className="group">
                <Plus className="mr-2 size-4" />
                Create your first resume
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Quick tips */}
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Start from scratch",
                desc: "Choose a template and build your resume from the ground up.",
              },
              {
                title: "Import existing",
                desc: "Upload a PDF or DOCX and we'll extract your content.",
              },
              {
                title: "Export in seconds",
                desc: "Download as PDF, DOCX, PNG, or JPG — unlimited.",
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
        </div>
      </div>
    </div>
  );
}
