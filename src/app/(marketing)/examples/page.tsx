"use client";

import Link from "next/link";
import { ArrowRight, Eye, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/lib/store";
import { SAMPLE_RESUME } from "@/components/templates/shared/sample-data";
import { TEMPLATE_REGISTRY } from "@/components/templates/registry";
import { useState } from "react";
import { saveResume as dbSaveResume } from "@/lib/db";
import { toast } from "sonner";

const examples = [
  {
    role: "Software Engineer",
    template: "chronos",
    description: "Clean reverse-chronological layout highlighting technical skills and impact metrics.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    role: "Product Designer",
    template: "creative",
    description: "Bold, visual-first layout showcasing design thinking and portfolio work.",
    color: "from-purple-500 to-pink-500",
  },
  {
    role: "Marketing Manager",
    template: "minimal",
    description: "Clean, results-oriented layout with campaign metrics and leadership highlights.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    role: "Senior Executive",
    template: "executive",
    description: "Two-column layout with a focus on strategic achievements and board experience.",
    color: "from-amber-500 to-orange-500",
  },
  {
    role: "Full Stack Developer",
    template: "split",
    description: "Balanced two-column layout with side-by-side technical skills and experience.",
    color: "from-cyan-500 to-sky-500",
  },
  {
    role: "Creative Director",
    template: "vibrant",
    description: "Colorful accent-heavy design with visual energy and bold typography.",
    color: "from-rose-500 to-pink-500",
  },
];

export default function ExamplesPage() {
  const router = useRouter();
  const importResume = useResumeStore((s) => s.importResume);
  const [loading, setLoading] = useState<string | null>(null);

  const handleUseExample = async (templateId: string) => {
    setLoading(templateId);
    try {
      // Create a copy of the sample resume with the selected template
      const example = {
        ...SAMPLE_RESUME,
        meta: {
          ...SAMPLE_RESUME.meta,
          id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          template: templateId,
          name: `Example - ${examples.find((e) => e.template === templateId)?.role || "Resume"}`,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      };
      await dbSaveResume(example);
      importResume(example);
      toast.success("Example loaded! Opening editor...");
      router.push("/editor");
    } catch (err) {
      console.error("Failed to load example:", err);
      toast.error("Failed to load example. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 text-center items-center">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            Inspiration
          </Badge>
          <h1 className="h1 text-foreground">Example Resumes</h1>
          <p className="body-lg text-muted-foreground max-w-xl">
            See how professionals use ResumeForge to build resumes that get results.
            Click any example to start editing immediately.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((ex) => {
            const tpl = TEMPLATE_REGISTRY.find((t) => t.id === ex.template);
            return (
              <div
                key={ex.role}
                className="group flex flex-col rounded-xl border border-border bg-background overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                onClick={() => handleUseExample(ex.template)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleUseExample(ex.template);
                  }
                }}
                aria-label={`Use ${ex.role} example`}
              >
                {/* Preview banner */}
                <div className={`h-36 bg-gradient-to-br ${ex.color} flex items-center justify-center relative`}>
                  <Eye className="size-10 text-white/40 group-hover:text-white/70 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="text-white text-xs font-medium flex items-center gap-1.5">
                      <Sparkles className="size-3" />
                      Use this example
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-sm">{ex.role}</h3>
                    <Badge variant="outline" className="text-[9px] capitalize">
                      {tpl?.name || ex.template}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ex.description}</p>
                  {loading === ex.template && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Loader2 className="size-3 animate-spin" />
                      Loading...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
