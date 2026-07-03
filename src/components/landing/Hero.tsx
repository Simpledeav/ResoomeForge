"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-16 md:pb-32 md:pt-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/3 blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <motion.div
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top section: text */}
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 px-4 py-1.5 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">
                100% free. No account. No watermark. No paywall.{" "}
                <span className="text-foreground font-medium">Ever.</span>
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              Build a resume that
              <br />
              <span className="bg-gradient-to-r from-accent via-accent to-success bg-clip-text text-transparent">
                gets you hired.
              </span>
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">
              The only resume builder that&apos;s actually, genuinely free.
              Unlimited PDF, DOCX, PNG & JPG downloads. No upsells. No
              watermark. No sign-up required.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/dashboard">
              <Button size="lg" className="group h-12 px-8 text-sm shadow-sm">
                Build my resume free
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-sm"
              >
                Browse 12 templates
              </Button>
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 pt-2"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {["bg-accent/20", "bg-accent/30", "bg-accent/40", "bg-accent/50"].map(
                  (bg, i) => (
                    <div
                      key={i}
                      className={`size-6 rounded-full border-2 border-background ${bg}`}
                    />
                  ),
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                <strong className="text-foreground font-medium">10,000+</strong>{" "}
                professionals
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span className="ml-1">
                <strong className="text-foreground font-medium">4.9</strong> avg
                rating
              </span>
            </div>
          </motion.div>
        </div>

        {/* Product mockup / visual area */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-muted/80 to-muted/30 shadow-lg">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-error/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <div className="ml-3 flex-1 rounded-md border border-border bg-background px-3 py-1 text-[10px] text-muted-foreground">
                resumeforge.com/dashboard
              </div>
            </div>

            {/* Mockup content */}
            <div className="flex flex-col gap-6 p-6 md:p-8">
              {/* Resume preview mockup */}
              <div className="mx-auto w-full max-w-[500px] rounded-lg border border-border bg-background p-5 shadow-sm">
                {/* Resume header */}
                <div className="flex items-start justify-between border-b border-border pb-4">
                  <div className="flex flex-col gap-1">
                    <div className="h-5 w-32 rounded bg-muted" />
                    <div className="mt-1 h-3 w-48 rounded bg-muted" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="h-3 w-24 rounded bg-muted" />
                    <div className="h-3 w-28 rounded bg-muted" />
                    <div className="h-3 w-20 rounded bg-muted" />
                  </div>
                </div>
                {/* Resume body */}
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3.5 w-40 rounded bg-muted/60" />
                    <div className="h-2.5 w-full rounded bg-muted/40" />
                    <div className="h-2.5 w-3/4 rounded bg-muted/40" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3.5 w-36 rounded bg-muted/60" />
                    <div className="h-2.5 w-full rounded bg-muted/40" />
                    <div className="h-2.5 w-5/6 rounded bg-muted/40" />
                    <div className="h-2.5 w-2/3 rounded bg-muted/40" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3.5 w-32 rounded bg-muted/60" />
                    <div className="h-2.5 w-full rounded bg-muted/40" />
                    <div className="h-2.5 w-4/5 rounded bg-muted/40" />
                  </div>
                </div>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-2">
                {["ATS-Optimized", "Unlimited Exports", "No Account", "Live Preview"].map(
                  (f) => (
                    <div
                      key={f}
                      className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur-sm"
                    >
                      <Check className="size-2.5 text-success" />
                      {f}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hidden md:flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
          <div className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hidden md:flex items-center justify-center">
            <span className="text-sm">🚀</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
