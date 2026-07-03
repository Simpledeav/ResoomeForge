"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    name: "Chronos",
    description: "Classic reverse-chronological layout. Gold standard for ATS.",
    category: "ATS-Safe",
    color: "from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800",
    badgeVariant: "default" as const,
  },
  {
    name: "Minimal",
    description: "Clean whitespace-driven design. Perfect for design roles.",
    category: "Modern",
    color: "from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Executive",
    description: "Two-column layout with sidebar. Built for senior leaders.",
    category: "ATS-Safe",
    color: "from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
    badgeVariant: "default" as const,
  },
  {
    name: "Creative",
    description: "Bold colors and modern typography for creative fields.",
    category: "Creative",
    color: "from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40",
    badgeVariant: "outline" as const,
  },
  {
    name: "Sidebar",
    description: "Skills-first layout with a colored accent sidebar.",
    category: "Modern",
    color: "from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Compact",
    description: "Single-page optimized for experienced professionals.",
    category: "ATS-Safe",
    color: "from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40",
    badgeVariant: "default" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function TemplatesShowcase() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {/* Section header */}
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="caption text-muted-foreground">Templates</span>
          <h2 className="h1 text-foreground">
            12 templates. <span className="text-muted-foreground">All free.</span>
          </h2>
          <p className="body-lg text-muted-foreground">
            Every template is ATS-parsed, printer-optimized, and available in
            light & dark mode. No locked features. No upsells. Pick one and
            start building.
          </p>
        </div>

        {/* Template cards */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {templates.map((template) => (
            <motion.div
              key={template.name}
              variants={itemVariants}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Template preview area */}
              <div
                className={`flex h-44 items-center justify-center bg-gradient-to-br ${template.color} border-b border-border`}
              >
                <div className="flex flex-col items-center gap-2 opacity-40 transition-all duration-200 group-hover:opacity-100 group-hover:scale-105">
                  <Eye className="size-5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Preview
                  </span>
                </div>
              </div>

              {/* Template info */}
              <div className="flex flex-col gap-2 bg-background p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    {template.name}
                  </h3>
                  <Badge
                    variant={template.badgeVariant}
                    className="text-[10px] uppercase tracking-wider"
                  >
                    {template.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Link href="/templates">
            <Button variant="outline" className="group">
              <Sparkles className="mr-2 size-3.5" />
              View all 12 templates
              <ArrowRight className="ml-2 size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
