"use client";

import Link from "next/link";
import { ArrowRight, FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = [
  {
    role: "Software Engineer",
    template: "Chronos",
    description: "Clean reverse-chronological layout highlighting technical skills and impact metrics.",
  },
  {
    role: "Product Designer",
    template: "Creative",
    description: "Bold, visual-first layout showcasing design thinking and portfolio work.",
  },
  {
    role: "Marketing Manager",
    template: "Minimal",
    description: "Clean, results-oriented layout with campaign metrics and leadership highlights.",
  },
  {
    role: "Senior Executive",
    template: "Executive",
    description: "Two-column layout with a focus on strategic achievements and board experience.",
  },
];

export default function ExamplesPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="h1 text-foreground">Example Resumes</h1>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto">
            See how professionals use ResumeForge to build resumes that get results.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {examples.map((ex) => (
            <div
              key={ex.role}
              className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-border p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border">
                <Eye className="size-8 text-muted-foreground opacity-50" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">{ex.role}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">
                    {ex.template}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{ex.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="group">
              Build yours free
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
