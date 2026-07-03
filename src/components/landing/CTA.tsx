"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="border-t border-border px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="flex flex-col gap-3">
          <h2 className="h1 text-foreground">
            Start building your resume.
            <br />
            <span className="text-muted-foreground">It&apos;s free.</span>
          </h2>
          <p className="body-lg text-muted-foreground">
            No account. No watermark. No paywall. Just a damn good resume in
            minutes.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" className="group h-12 px-8 text-sm">
              Build for free
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/templates">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-sm"
            >
              Browse templates
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          No credit card required. No data collected. Start in 10 seconds.
        </p>
      </motion.div>
    </section>
  );
}
