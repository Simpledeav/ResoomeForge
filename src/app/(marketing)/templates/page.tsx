"use client";

import Link from "next/link";
import { ArrowRight, Layout, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const templateCategories = [
  {
    name: "ATS-Safe",
    description: "Built to pass automated resume parsers.",
    templates: ["Chronos", "Executive", "Compact"],
    icon: FileText,
  },
  {
    name: "Modern",
    description: "Clean, contemporary designs for any industry.",
    templates: ["Minimal", "Sidebar", "Split"],
    icon: Layout,
  },
  {
    name: "Creative",
    description: "Bold layouts for design and creative roles.",
    templates: ["Creative", "Bold", "Vibrant"],
    icon: Download,
  },
];

export default function TemplatesPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            12 Templates
          </Badge>
          <h1 className="h1 text-foreground">Choose your template</h1>
          <p className="body-lg text-muted-foreground max-w-xl">
            Every template is ATS-friendly, printer-optimized, and fully
            customizable. No locked features — ever.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {templateCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col gap-6 rounded-xl border border-border p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted">
                  <cat.icon className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-semibold text-foreground text-sm">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {cat.templates.map((t) => (
                  <Link
                    key={t}
                    href="/editor"
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50 hover:border-foreground/20"
                  >
                    <span className="text-sm text-foreground">{t}</span>
                    <span className="text-xs text-muted-foreground transition-colors">
                      Use &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="group">
              Start building free
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
