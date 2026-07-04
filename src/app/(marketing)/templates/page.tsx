"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/lib/store";
import { TEMPLATE_REGISTRY, getTemplatesByCategory } from "@/components/templates/registry";
import { SAMPLE_RESUME } from "@/components/templates/shared/sample-data";
import { createEmptyResume } from "@/lib/schema";
import { saveResume as dbSaveResume } from "@/lib/db";
import { toast } from "sonner";
import { useState } from "react";

const categoryInfo: Record<string, { description: string; icon: string }> = {
  "ats-safe": { description: "Built to pass automated resume parsers. Clean, parseable, recruiter-approved.", icon: "📄" },
  modern: { description: "Clean, contemporary designs for any industry. Whitespace-driven and professional.", icon: "✨" },
  creative: { description: "Bold layouts for design and creative roles. Stand out with visual impact.", icon: "🎨" },
};

function TemplateCard({ template }: { template: (typeof TEMPLATE_REGISTRY)[number] }) {
  const router = useRouter();
  const importResume = useResumeStore((s) => s.importResume);
  const [loading, setLoading] = useState(false);

  const handleUse = async () => {
    setLoading(true);
    try {
      const resume = createEmptyResume();
      resume.meta.template = template.id;
      resume.meta.name = `New ${template.name} Resume`;
      await dbSaveResume(resume);
      importResume(resume);
      toast.success(`Created new ${template.name} resume!`);
      router.push("/editor");
    } catch (err) {
      console.error("Failed to create resume:", err);
      toast.error("Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="group flex flex-col rounded-xl border border-border bg-background overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      onClick={handleUse}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleUse();
        }
      }}
      aria-label={`Use ${template.name} template`}
    >
      {/* Preview area */}
      <div className={`h-40 ${template.preview} flex items-center justify-center relative`}>
        <div className="flex flex-col items-center gap-2">
          <div className="h-14 w-10 rounded border border-border/40 bg-background/60 flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-foreground/60">{template.name.charAt(0)}</span>
          </div>
          <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
            {template.category}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
          <span className={`text-xs font-medium flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 shadow-sm border border-border`}>
            <Sparkles className="size-3" />
            Use template
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground text-sm">{template.name}</h3>
          <Badge variant="outline" className="text-[9px] capitalize">
            {template.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{template.description}</p>
        {loading && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <Loader2 className="size-3 animate-spin" />
            Creating...
          </div>
        )}
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const categories = ["ats-safe", "modern", "creative"] as const;

  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="text-xs uppercase tracking-wider">
            {TEMPLATE_REGISTRY.length} Templates
          </Badge>
          <h1 className="h1 text-foreground">Choose your template</h1>
          <p className="body-lg text-muted-foreground max-w-xl">
            Every template is ATS-friendly, printer-optimized, and fully
            customizable. Click any template to start building immediately.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {categories.map((cat) => {
            const templates = getTemplatesByCategory(cat);
            const info = categoryInfo[cat];
            return (
              <section key={cat}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl">{info.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground capitalize">{cat}</h2>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {templates.map((t) => (
                    <TemplateCard key={t.id} template={t} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
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
